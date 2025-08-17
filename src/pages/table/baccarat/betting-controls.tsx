'use client';
import { CancelBetBtn, ChipSettingsBtn, PlaceBetBtn, RepeatBetBtn } from '@/components/ui';
import Chip from '@/components/ui/buttons/chip';
import { SFX } from '@/constants/sounds';
import { useSfxSound } from '@/hooks/useSfx';
import { useChipsStore } from '@/store/chipStore';
import { ChipProps } from '@/types';
import { Box } from '@mantine/core';
import { useState } from 'react';

interface MainProps {
  onClick: (data: { amount: number; chip: string; x: number; y: number }) => void;
  clearBets?: React.Dispatch<React.SetStateAction<ChipProps[]>>;
  onRepeatBet?: (data: any) => void;
  tableId: number;
}

const BettingControls = ({ onClick, clearBets, tableId }: MainProps) => {
  const { chips } = useChipsStore();
  const [selectedChip, setSelectedChip] = useState<string>('');
  const [playClick] = useSfxSound(SFX.click);

  return (
    <Box className="betting-area-controls">
      <ChipSettingsBtn />
      <RepeatBetBtn tableId={tableId} />
      <Box className="betting-chips">
        {chips
          .filter((chip) => chip.selected)
          .map((item, idx) => (
            <Chip
              onClick={(data) => {
                onClick({ amount: item.amount, chip: data.selected, x: data.x, y: data.y }),
                  setSelectedChip(data.selected),
                  playClick();
              }}
              selected={selectedChip}
              color={item.color}
              amount={item.amount}
              key={idx}
            />
          ))}
      </Box>
      <CancelBetBtn
        onCancelBets={() => {
          clearBets && clearBets([]);
        }}
        tableId={tableId}
      />
      <PlaceBetBtn tableId={tableId} />
    </Box>
  );
};

export default BettingControls;
