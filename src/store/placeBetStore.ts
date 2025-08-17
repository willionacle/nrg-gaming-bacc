import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type RoomBets = {
  [roomId: number]: boolean;
};

type BetState = {
  roomBets: RoomBets;
  placeBet: (roomId: number) => void;
  resetBet: (roomId: number) => void;
  isBetPlaced: (roomId: number) => boolean;
};

export const placeBetStore = create<BetState>()(
  persist(
    (set, get) => ({
      roomBets: {},
      placeBet: (roomId) =>
        set((state) => ({
          roomBets: { ...state.roomBets, [roomId]: true },
        })),
      resetBet: (roomId) =>
        set((state) => {
          const updated = { ...state.roomBets };
          delete updated[roomId];
          return { roomBets: updated };
        }),
      isBetPlaced: (roomId) => !!get().roomBets[roomId],
    }),
    {
      name: 'place-bet-storage',
    }
  )
);
