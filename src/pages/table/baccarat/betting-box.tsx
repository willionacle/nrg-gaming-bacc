'use client';

import { Box } from '@mantine/core';
import clsx from 'clsx';
import BetAreaStats from './bet-area-stats';
import { StaticChip } from '@/components';
import BetCardResults from './bet-card-results';
// import { ChipProps } from '@/types';

interface CardResult {
  score: number;
  cards: string[];
}

interface Props {
  keyName: string;
  shortenKey: string;
  isWin: boolean;
  isDisabled: boolean;
  onClick: () => void;
  totalAmount: number;
  chip: string;
  onPositionChange: (position: { x: number; y: number; width: number; height: number }) => void;
  opacity: number;
  cardResults?: CardResult;
  extraComponent: React.ReactNode;
}

export default function BettingBox({
  keyName,
  shortenKey,
  isWin,
  isDisabled,
  onClick,
  totalAmount,
  chip,
  onPositionChange,
  opacity,
  cardResults,
  extraComponent,
}: Props) {
  return (
    <Box
      onClick={onClick}
      className={clsx(
        `betting-button betting-area-${shortenKey}`,
        isWin && 'blink-bright',
        isDisabled && 'pointer-none'
      )}
    >
      <BetAreaStats title={keyName} bets={1000} users={10} />
      {extraComponent && extraComponent}
      <StaticChip
        amount={totalAmount}
        chip={chip}
        onPositionChange={onPositionChange}
        opacity={opacity}
      />
      {cardResults && (
        <BetCardResults
          total={cardResults.score}
          pos={keyName === 'PLAYER' ? 'left' : 'right'}
          cards={cardResults.cards}
        />
      )}
    </Box>
  );
}
