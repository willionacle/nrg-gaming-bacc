import { create } from 'zustand';
import { persist, subscribeWithSelector } from 'zustand/middleware';
import { ChipProps } from '@/types';

interface BetStore {
  bets: Record<number, ChipProps[]>;
  previousBets: Record<number, ChipProps[] | null>;
  selectedSeat: Record<number, string>;
  selectedBetOption: Record<number, string>;

  setBetsStore: (tableId: number, chips: ChipProps[]) => void;
  clearBets: (tableId: number) => void;

  setPreviousBets: (tableId: number, chips: ChipProps[] | null) => void;

  setSelectedSeat: (tableId: number, seat: string) => void;
  setSelectedBetOption: (tableId: number, option: string) => void;

  getBetsByTableId: (tableId: number) => ChipProps[];
  getPreviousBetsByTableId: (tableId: number) => ChipProps[] | null;
  getSelectedSeat: (tableId: number) => string;
  getSelectedBetOption: (tableId: number) => string;
  hasBet: (tableId: number) => boolean;
}

const betsStore = create<BetStore>()(
  subscribeWithSelector(
    persist(
      (set, get) => ({
        bets: {},
        previousBets: {},
        selectedSeat: {},
        selectedBetOption: {},

        setBetsStore: (tableId, chips) =>
          set((state) => ({
            bets: {
              ...state.bets,
              [tableId]: chips,
            },
          })),

        clearBets: (tableId) =>
          set((state) => ({
            bets: {
              ...state.bets,
              [tableId]: [],
            },
          })),

        setPreviousBets: (tableId, chips) =>
          set((state) => ({
            previousBets: {
              ...state.previousBets,
              [tableId]: chips,
            },
          })),

        setSelectedSeat: (tableId, seat) =>
          set((state) => ({
            selectedSeat: {
              ...state.selectedSeat,
              [tableId]: seat,
            },
          })),

        setSelectedBetOption: (tableId, option) =>
          set((state) => ({
            selectedBetOption: {
              ...state.selectedBetOption,
              [tableId]: option,
            },
          })),

        getBetsByTableId: (tableId) => get().bets[tableId] || [],
        getPreviousBetsByTableId: (tableId) => get().previousBets[tableId] || null,
        getSelectedSeat: (tableId) => get().selectedSeat[tableId] || '',
        getSelectedBetOption: (tableId) => get().selectedBetOption[tableId] || '',
        hasBet: (tableId) => !!get().bets[tableId]?.length,
      }),
      {
        name: 'bets-storage',
      }
    )
  )
);

export default betsStore;
