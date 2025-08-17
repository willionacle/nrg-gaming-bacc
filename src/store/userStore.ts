import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types';

type UserInfoState = {
  userInfo: User | null;
  afterPlaceBetBalance: number;
  setUserInfo: (info: User) => void;
  clearUserInfo: () => void;
  setLanguage: (lang: 'en' | 'kr') => void;
  updateBalance: (newBalance: number) => void; // <- Add this
  updateAfterPlaceBetBalance: (newBalance: number) => void; // <- Add this
};

const userInfoStore = create<UserInfoState>()(
  persist(
    (set) => ({
      userInfo: null,
      afterPlaceBetBalance: 0,
      setUserInfo: (info) => set({ userInfo: info }),
      clearUserInfo: () => set({ userInfo: null }),
      setLanguage: (lang) =>
        set((state) =>
          state.userInfo ? { userInfo: { ...state.userInfo, language: lang } } : state
        ),
      updateBalance: (newBalance) =>
        set((state) =>
          state.userInfo ? { userInfo: { ...state.userInfo, tu_balance: newBalance } } : state
        ),
      updateAfterPlaceBetBalance: (newBalance) => set({ afterPlaceBetBalance: newBalance }),
    }),
    {
      name: 'user-info-storage',
    }
  )
);

export default userInfoStore;
