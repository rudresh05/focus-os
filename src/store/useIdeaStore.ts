import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Idea } from '@/types';
import * as api from '@/lib/api';

interface IdeaState {
  ideas: Idea[];
  isLoading: boolean;
  addIdea: (idea: Omit<Idea, 'id' | 'createdAt'>) => Promise<void>;
  deleteIdea: (id: string) => Promise<void>;
  updateIdea: (id: string, updates: Partial<Idea>) => void;
  syncIdeas: () => Promise<void>;
}

export const useIdeaStore = create<IdeaState>()(
  persist(
    (set) => ({
      ideas: [],
      isLoading: false,

      addIdea: async (ideaData) => {
        set({ isLoading: true });
        try {
          const newIdea: Idea = {
            ...ideaData,
            id: Math.random().toString(36).substring(7),
            createdAt: new Date().toISOString(),
          };
          set((state) => ({
            ideas: [newIdea, ...state.ideas],
          }));

          await api.createIdea(ideaData);
        } catch (error) {
          console.error('Failed to add idea to API:', error);
        } finally {
          set({ isLoading: false });
        }
      },

      deleteIdea: async (id) => {
        set((state) => ({
          ideas: state.ideas.filter((i) => i.id !== id),
        }));
        try {
          await api.removeIdea(id);
        } catch (error) {
          console.error('Failed to remove idea from API:', error);
        }
      },

      updateIdea: (id, updates) => {
        set((state) => ({
          ideas: state.ideas.map((i) => (i.id === id ? { ...i, ...updates } : i)),
        }));
      },

      syncIdeas: async () => {
        set({ isLoading: true });
        try {
          const data = await api.fetchIdeas();
          if (Array.isArray(data)) {
            set({ ideas: data });
          } else {
            console.error('API returned non-array for ideas:', data);
          }
        } catch (error) {
          console.error('Failed to sync ideas from API:', error);
        } finally {
          set({ isLoading: false });
        }
      }
    }),
    {
      name: 'focus-os-idea-storage',
    }
  )
);

