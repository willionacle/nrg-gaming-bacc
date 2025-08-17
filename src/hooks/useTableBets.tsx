import { useEffect, useState } from 'react';
import betsStore from '@/store/betsStore';
import { ChipProps } from '@/types';
import userInfoStore from '@/store/userStore';

export const useTableBets = (tableId: number): { bets: ChipProps[]; totalBet: number } => {
  const [bets, setBets] = useState<ChipProps[]>([]);
  const [totalBet, setTotalBet] = useState<number>(0);
  const updateAfterPlaceBetBalance = userInfoStore((state) => state.updateAfterPlaceBetBalance);
  const userInfo = userInfoStore((state) => state.userInfo);

  useEffect(() => {
    const unsub = betsStore.subscribe<ChipProps[] | undefined>(
      (state) => state.bets[tableId],
      (value) => {
        setBets(value || []);
        setTotalBet((value || []).reduce((sum, bet) => sum + bet.amount, 0));
      },
      {
        fireImmediately: true,
      }
    );

    return unsub;
  }, [tableId]);

  useEffect(() => {
    updateAfterPlaceBetBalance((userInfo?.tu_balance || 0) - totalBet);
  }, [totalBet]);

  return { bets, totalBet };
};
