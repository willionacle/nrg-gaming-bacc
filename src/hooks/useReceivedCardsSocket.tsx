import { socket } from '@/lib/client';
import { useCallback, useEffect } from 'react';
import tableInfoStore from '@/store/tableInfoStore';
import cardResultsStore from '@/store/cardResultsStore';
import { Deal2 } from '@/types';
// import { TABLE_STATUS } from '@/constants/tableStatus';

export default function useReceivedCardsSocket(persistedCards?: Deal2) {
  const tableInfo = tableInfoStore((state) => state.tableInfo);
  const setCardResults = cardResultsStore((state) => state.setCardResults);
  const cardResults = cardResultsStore((state) => state.cardResults);

  // Baccarat score: A=1, 2–9=face, 10/J/Q/K=0
  const calculateBaccaratScore = (cards: { card: string }[]) => {
    const cardValue = (card: string) => {
      const rank = card.slice(0, -1); // remove suit
      if (rank === 'A') return 1;
      if (['10', 'J', 'Q', 'K'].includes(rank)) return 0;
      return parseInt(rank, 10);
    };

    const total = cards.reduce((sum, c) => sum + cardValue(c.card), 0);
    return total % 10;
  };

  // Niu Niu value: A=1, 2–10=face, J/Q/K=10
  const getCardValue = ({ card }: { card: string }) => {
    const num = card.slice(0, -1);
    const value = parseInt(num, 10);
    return isNaN(value) ? 0 : value >= 10 ? 10 : value;
  };

  const getNiuNiuResult = (cards: { card: string }[]) => {
    const values = cards.map(getCardValue);
    for (let i = 0; i < values.length - 2; i++) {
      for (let j = i + 1; j < values.length - 1; j++) {
        for (let k = j + 1; k < values.length; k++) {
          const sum = values[i] + values[j] + values[k];
          if (sum % 10 === 0) {
            const remaining = values.filter((_, idx) => idx !== i && idx !== j && idx !== k);
            const bullValue = (remaining[0] + remaining[1]) % 10;
            return bullValue === 0 ? 'NIU NIU' : `NIU ${bullValue}`;
          }
        }
      }
    }
    return 'HIGH CARD';
  };

  const handleReceiveCards = useCallback(
    (rawCards: Deal2) => {
      // console.log(rawCards, 'caaaards');
      // console.log(tableInfo?.tc_status);
      // if (tableInfo?.tc_status === TABLE_STATUS.dealingCard) {
      // const playerScore = calculateBaccaratScore(rawCards?.player || []);
      // const bankerScore = calculateBaccaratScore(rawCards?.banker || []);
      // const player2Score = calculateBaccaratScore(rawCards?.player_2 || []);
      // const player3Score = calculateBaccaratScore(rawCards?.player_3 || []);

      const playerScore = rawCards?.score?.playerScore ?? 0;
      const bankerScore = rawCards?.score?.bankerScore ?? 0;
      const player2Score = calculateBaccaratScore(rawCards?.cards?.player_2 || []);
      const player3Score = calculateBaccaratScore(rawCards?.cards?.player_3 || []);

      const playerNiu = getNiuNiuResult(rawCards?.cards?.player || []);
      const bankerNiu = getNiuNiuResult(rawCards?.cards?.banker || []);
      const player2Niu = getNiuNiuResult(rawCards?.cards?.player_2 || []);
      const player3Niu = getNiuNiuResult(rawCards?.cards?.player_3 || []);

      setCardResults({
        banker: (rawCards?.cards?.banker || []).map((c) => c.card),
        player: (rawCards?.cards?.player || []).map((c) => c.card),
        player_2: (rawCards?.cards?.player_2 || []).map((c) => c.card),
        player_3: (rawCards?.cards?.player_3 || []).map((c) => c.card),
        playerScore,
        bankerScore,
        player2Score,
        player3Score,
        playerNiu,
        bankerNiu,
        player2Niu,
        player3Niu,
      });
      // }
    },
    [setCardResults]
  );

  useEffect(() => {
    socket.on('receiveCards', handleReceiveCards);
    return () => {
      socket.off('receiveCards', handleReceiveCards);
    };
  }, [handleReceiveCards, tableInfo]);

  useEffect(() => {
    if (persistedCards)
      handleReceiveCards({ cards: persistedCards, score: persistedCards.score } as Deal2);
  }, [persistedCards]);

  return { cardResults, setCardResults };
}
