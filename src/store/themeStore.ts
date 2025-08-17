import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeStore {
  scoreboardTheme: 'light' | 'dark';
  setScoreboardTheme: (theme: 'light' | 'dark') => void;
}

const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      scoreboardTheme: 'dark',
      setScoreboardTheme: (theme) => set({ scoreboardTheme: theme }),
    }),
    {
      name: 'scoreboard-theme-storage',
    }
  )
);

export default useThemeStore;
