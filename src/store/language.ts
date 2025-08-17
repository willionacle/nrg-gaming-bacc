import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type LangState = {
  language: 'en' | 'kr';
  setLanguage: (lang: 'en' | 'kr') => void;
};

const useLangStore = create<LangState>()(
  persist(
    (set) => ({
      language: 'en',
      setLanguage: (lang) => set({ language: lang }),
    }),
    {
      name: 'lang-storage',
    }
  )
);

export default useLangStore;
