import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Chip {
  amount: number;
  color: 'blue' | 'green' | 'pink' | 'yellow' | 'brown' | 'orange' | 'purple' | 'red';
  selected: boolean;
}

type Color = Chip['color'];
const palette: Color[] = ['blue', 'green', 'pink', 'yellow', 'brown', 'orange', 'purple', 'red'];

interface ChipsState {
  chips: Chip[];
  toggleChip: (amount: number) => void;
  setAllChips: (chips: Chip[]) => void;
  setFromBetchips: (betchips: Record<string, number>) => void;
}

export const useChipsStore = create<ChipsState>()(
  persist(
    (set) => ({
      chips: [
        { amount: 10, color: 'blue', selected: true },
        { amount: 100, color: 'green', selected: true },
        { amount: 500, color: 'pink', selected: true },
        { amount: 1000, color: 'yellow', selected: true },
        { amount: 10000, color: 'brown', selected: true },
        { amount: 15000, color: 'orange', selected: true },
        { amount: 100000, color: 'purple', selected: true },
        { amount: 500000, color: 'red', selected: true },
      ],

      toggleChip: (amount) =>
        set((state) => ({
          chips: state.chips.map((c) =>
            c.amount === amount ? { ...c, selected: !c.selected } : c
          ),
        })),

      setAllChips: (chips) => set({ chips }),

      setFromBetchips: (betchips) =>
        set((state) => {
          const values = Object.values(betchips).sort((a, b) => a - b);
          const selectedMap = new Map(state.chips.map((c) => [c.amount, c.selected]));

          const chips: Chip[] = values.map((amount, i) => ({
            amount,
            color: palette[i % palette.length],
            // keep previous selection if same amount exists
            selected: selectedMap.get(amount) ?? true,
          }));

          return { chips };
        }),
    }),
    { name: 'chip-preferences' }
  )
);
