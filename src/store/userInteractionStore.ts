import { create } from 'zustand';

type UserInteractionState = {
  isInteracted: boolean;
  isBettingAreaOpenOnLoad: boolean;
  isNiuBoardResultOpen: boolean;
  setInteracted: () => void;
  setIsBettingAreaOpenOnLoad: (data: boolean) => void;
  setIsNiuBoardResultOpen: (data?: boolean) => void;
};

export const useUserInteractionStore = create<UserInteractionState>((set) => ({
  isInteracted: false,
  isBettingAreaOpenOnLoad: false,
  isNiuBoardResultOpen: false,
  setInteracted: () => set({ isInteracted: true }),
  setIsBettingAreaOpenOnLoad: (data: boolean) => set(() => ({ isBettingAreaOpenOnLoad: data })),
  setIsNiuBoardResultOpen: () =>
    set((state) => ({ isNiuBoardResultOpen: !state.isNiuBoardResultOpen })),
}));
