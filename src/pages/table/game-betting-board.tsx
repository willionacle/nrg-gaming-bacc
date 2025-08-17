'use client';
import React, { useState } from 'react';
import { useSfxSound } from '@/hooks/useSfx';
import { SFX } from '@/constants/sounds';
import { ChipProps, ScoreboardData, ScoreboardData2, ServerAPIResponse } from '@/types';
import betsStore from '@/store/betsStore';
import { useFetch } from '@/hooks/useFetch';
import { useTableBets } from '@/hooks/useTableBets';
import NiuBettingArea from './niu-niu/niu-betting-board';
import { useParams, useSearchParams } from 'react-router-dom';
import { ChipMotion } from '@/components';
import { BaccaratBettingBoard } from './baccarat';

const GameBettingBoard = () => {
  const { id: tableId } = useParams();
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  const setBetsStore = betsStore((state) => state.setBetsStore);
  const { bets } = useTableBets(Number(tableId));
  const [chipDrop] = useSfxSound(SFX.chipDrop);
  const [selectedChips, setSelectedChips] = useState<ChipProps[]>([]);
  const [isChipAnimating, setIsChipAnimating] = useState<boolean>(false);
  const { data: resultData, refetch } = useFetch<
    ServerAPIResponse<ScoreboardData | ScoreboardData2>
  >(`${category === 'niu' ? 'getresults2' : 'getresults'}?tableid=${tableId}`);

  const handleSelectedChips: React.Dispatch<React.SetStateAction<ChipProps[]>> = (value) => {
    if (typeof value === 'function') {
      setSelectedChips((prev) => (value as (prev: ChipProps[]) => ChipProps[])(prev));
    } else {
      setSelectedChips(value);
    }
  };

  const onEndAnimation = (data: ChipProps, idx: number) => {
    setBetsStore(Number(tableId), [...bets, data]);
    setSelectedChips((prev) => prev.filter((_, i) => i !== idx));
  };

  return (
    <>
      {selectedChips.map((item, idx) => (
        <ChipMotion
          key={idx}
          chip={item}
          index={idx}
          category={category}
          onAnimationComplete={() => {
            onEndAnimation(selectedChips[0], idx);
            chipDrop();
            setIsChipAnimating(false);
          }}
        />
      ))}
      {category === 'baccarat' && (
        <BaccaratBettingBoard
          resultData={resultData?.data as ScoreboardData | undefined}
          isChipAnimating={isChipAnimating}
          setIsChipAnimating={setIsChipAnimating}
          setSelectedChips={handleSelectedChips}
          refetchBoardResults={refetch}
        />
      )}
      {category === 'niu' && (
        <NiuBettingArea
          isChipAnimating={isChipAnimating}
          setIsChipAnimating={setIsChipAnimating}
          setSelectedChips={handleSelectedChips}
        />
      )}
    </>
  );
};

export default GameBettingBoard;
