import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Sprint, DailyTracking, DailyTask, WeeklyReview } from '@/types';
import { addDays, format, isAfter, isBefore, parseISO, startOfWeek, endOfWeek } from 'date-fns';
import * as api from '@/lib/api';

interface SprintState {
  activeSprint: Sprint | null;
  dailyTracking: DailyTracking[];
  sprints: Sprint[];
  weeklyReviews: WeeklyReview[];
  isLoading: boolean;
  
  // Actions
  startSprint: (sprint: Omit<Sprint, 'id' | 'isActive' | 'isCompleted'>) => Promise<void>;
  completeSprint: () => Promise<void>;
  updateDailyTask: (date: string, taskId: string, isCompleted: boolean) => Promise<void>;
  getDailyTracking: (date: string) => DailyTracking;
  getSprintIntegrity: () => number;
  addWeeklyReview: (review: Omit<WeeklyReview, 'id'>) => Promise<void>;
  syncData: () => Promise<void>;
}

export const useSprintStore = create<SprintState>()(
  persist(
    (set, get) => ({
      activeSprint: null,
      dailyTracking: [],
      sprints: [],
      weeklyReviews: [],
      isLoading: false,

      addWeeklyReview: async (reviewData) => {
        set({ isLoading: true });
        try {
          const newReview: WeeklyReview = {
            ...reviewData,
            id: Math.random().toString(36).substring(7),
          };
          set((state) => ({
            weeklyReviews: [...state.weeklyReviews, newReview],
          }));
          await api.saveReview(reviewData);
        } catch (error) {
          console.error('Failed to save review:', error);
        } finally {
          set({ isLoading: false });
        }
      },

      startSprint: async (sprintData) => {
        set({ isLoading: true });
        try {
          const newSprint: Sprint = {
            ...sprintData,
            id: Math.random().toString(36).substring(7),
            isActive: true,
            isCompleted: false,
          };
          
          set((state) => ({
            activeSprint: newSprint,
            sprints: [...state.sprints, newSprint],
          }));

          await api.createSprint(newSprint);
        } catch (error) {
          console.error('Failed to start sprint:', error);
        } finally {
          set({ isLoading: false });
        }
      },

      completeSprint: async () => {
        set((state) => {
          if (!state.activeSprint) return state;
          const completedSprint = { ...state.activeSprint, isActive: false, isCompleted: true };
          return {
            activeSprint: null,
            sprints: state.sprints.map((s) => (s.id === completedSprint.id ? completedSprint : s)),
          };
        });
      },

      getDailyTracking: (date) => {
        const { activeSprint, dailyTracking } = get();
        const existing = dailyTracking.find((t) => t.date === date);
        if (existing) return existing;

        // Initialize new tracking using the sprint's designed protocol
        const tasksTemplate = activeSprint?.tasks || [];
        const newTracking: DailyTracking = {
          date,
          tasks: tasksTemplate.map((name) => ({ 
            id: Math.random().toString(36).substring(7),
            name, 
            isCompleted: false 
          })),
          score: 0,
        };
        return newTracking;
      },

      updateDailyTask: async (date, taskId, isCompleted) => {
        let updatedDay: DailyTracking | null = null;

        set((state) => {
          const dailyTracking = [...state.dailyTracking];
          let dayIndex = dailyTracking.findIndex((t) => t.date === date);

          if (dayIndex === -1) {
            const newTracking = get().getDailyTracking(date);
            dailyTracking.push(newTracking);
            dayIndex = dailyTracking.length - 1;
          }

          const day = { ...dailyTracking[dayIndex] };
          day.tasks = day.tasks.map((t) => (t.id === taskId ? { ...t, isCompleted } : t));
          
          const completedCount = day.tasks.filter((t) => t.isCompleted).length;
          day.score = day.tasks.length > 0 ? Math.round((completedCount / day.tasks.length) * 100) : 0;

          dailyTracking[dayIndex] = day;
          updatedDay = day;
          return { dailyTracking };
        });

        if (updatedDay) {
          try {
            await api.saveTracking(updatedDay);
          } catch (error) {
            console.error('Failed to sync tracking:', error);
          }
        }
      },

      getSprintIntegrity: () => {
        const { activeSprint, dailyTracking } = get();
        if (!activeSprint) return 0;

        const start = parseISO(activeSprint.startDate);
        const end = parseISO(activeSprint.endDate);
        const today = new Date();
        const lastRelevantDate = isBefore(today, end) ? today : end;

        let totalDays = 0;
        let successfulDays = 0;

        dailyTracking.forEach((day) => {
          const date = parseISO(day.date);
          if ((isAfter(date, start) || day.date === activeSprint.startDate) && 
              (isBefore(date, lastRelevantDate) || day.date === format(lastRelevantDate, 'yyyy-MM-dd'))) {
            totalDays++;
            if (day.score >= 80) successfulDays++;
          }
        });

        return totalDays === 0 ? 0 : Math.round((successfulDays / totalDays) * 100);
      },

      syncData: async () => {
        set({ isLoading: true });
        try {
          const sprints = await api.fetchSprints();
          if (Array.isArray(sprints)) {
            const active = sprints.find((s: any) => s.is_active);
            
            if (active) {
              const mappedActive: Sprint = {
                id: active.id,
                name: active.name,
                goal: active.goal,
                startDate: active.start_date,
                endDate: active.end_date,
                isActive: active.is_active,
                isCompleted: active.is_completed,
                tasks: active.tasks || []
              };
              set({ activeSprint: mappedActive });
            }
          }
        } catch (error) {
          console.error('Failed to sync data:', error);
        } finally {
          set({ isLoading: false });
        }
      }
    }),
    {
      name: 'focus-os-sprint-storage',
    }
  )
);
