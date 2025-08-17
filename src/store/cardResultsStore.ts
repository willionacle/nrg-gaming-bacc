import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CardResults } from '@/types';
// interface Deal {
//   player: string[];
//   banker: string[];
//   player_2?: string[];
//   player_3?: string[];
// }

interface CardResultsStore {
  cardResults: CardResults | null;
  setCardResults: (results: CardResults | null) => void;
}

const cardResultsStore = create<CardResultsStore>()(
  persist(
    (set) => ({
      cardResults: null,
      setCardResults: (results) => set({ cardResults: results }),
    }),
    {
      name: 'card-results-storage',
    }
  )
);

export default cardResultsStore;
