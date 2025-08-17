import { Chip } from '@/components/ui';
import { SFX } from '@/constants/sounds';
import { useSfxSound } from '@/hooks/useSfx';
import { Group } from '@mantine/core';
import { useState } from 'react';

interface ChipProps {
  color: 'blue' | 'green' | 'pink' | 'yellow' | 'brown' | 'orange' | 'purple' | 'red';
  amount: number;
}

interface Props {
  onClick: (data: { amount: number; chip: string; x: number; y: number }) => void;
}

const chips: ChipProps[] = [
  { amount: 1000, color: 'blue' },
  { amount: 10000, color: 'green' },
  { amount: 100000, color: 'yellow' },
  { amount: 500000, color: 'pink' },
  { amount: 1000000, color: 'purple' },
];

const NiuChips = ({ onClick }: Props) => {
  const [selectedChip, setSelectedChip] = useState<string>('');
  const [playClick] = useSfxSound(SFX.click);

  return (
    <Group wrap="nowrap" className="niu-chips">
      {chips.map((item, idx) => (
        <Chip
          color={item.color}
          key={idx}
          amount={item.amount}
          onClick={(data) => {
            setSelectedChip(data.selected),
              onClick(
                !!data.selected
                  ? { amount: item.amount, chip: data.selected, x: data.x, y: data.y }
                  : { amount: 0, chip: null, x: 0, y: 0 }
              ),
              playClick();
          }}
          selected={selectedChip}
          niu
        />
      ))}
    </Group>
  );
};

export default NiuChips;
