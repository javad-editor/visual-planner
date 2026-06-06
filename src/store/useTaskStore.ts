import { create } from "zustand";

export interface Task {
  id: string;
  title: string;
  timeString: string;
  durationMinutes: number; // Changed from string to number
  theme: "blue" | "emerald" | "amber" | "rose";
  iconName: string;
}

interface TaskState {
  tasks: Task[];
  addTask: (task: Omit<Task, "id">) => void;
  deleteTask: (id: string) => void;
  clearTasks: () => void;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [
    {
      id: "1",
      timeString: "09:00",
      durationMinutes: 45, // Math-friendly
      title: "Daily Standup",
      theme: "blue",
      iconName: "Users",
    },
    {
      id: "2",
      timeString: "10:00",
      durationMinutes: 120, 
      title: "Deep Work: React Native Architecture",
      theme: "emerald",
      iconName: "Code"
    },
    {
      id: "3",
      timeString: "13:30",
      durationMinutes: 30,
      title: "Lunch Break",
      theme: "amber",
      iconName: "Coffee"
    },
  ],
  
  addTask: (newTask) => 
    set((state) => ({
      tasks: [
        ...state.tasks, 
        { ...newTask, id: Math.random().toString(36).substring(7) }
      ].sort((a, b) => a.timeString.localeCompare(b.timeString))
    })),

    deleteTask: (id) => 
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id)
    })),

  clearTasks: () => set({ tasks: [] }),
}));