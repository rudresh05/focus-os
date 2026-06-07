export interface Sprint {
  id: string;
  name: string;
  goal: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  isCompleted: boolean;
  tasks: string[]; // Daily protocol templates
}

export interface DailyTask {
  id: string;
  name: string;
  isCompleted: boolean;
}

export interface DailyTracking {
  date: string;
  tasks: DailyTask[];
  score: number;
}

export interface Idea {
  id: string;
  title: string;
  description?: string;
  category: string;
  createdAt: string;
}

export interface WeeklyReview {
  id: string;
  sprintId: string;
  weekNumber: number;
  whatWorked: string;
  whatFailed: string;
  biggestDistraction: string;
  nextWeekFocus: string;
  date: string;
}
