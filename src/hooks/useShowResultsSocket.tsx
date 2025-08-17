import { useCallback, useEffect, useState } from 'react';
import { useSfxSound } from '@/hooks/useSfx';
import { SFX } from '@/constants/sounds';
import { socket } from '@/lib/client';
import { BaccaratResult } from '@/types';
import betsStore from '@/store/betsStore';
import useRefetchUser from './useRefetchUser';
import tableInfoStore from '@/store/tableInfoStore';
import { useUserInteractionStore } from '@/store/userInteractionStore';
import { placeBetStore } from '@/store/placeBetStore';
import { useTranslation } from 'react-i18next';

type SupportedLang = 'en' | 'kr' | 'jp' | 'cn' | 'vn';

export const useShowResultsSocket = (): BaccaratResult | null => {
  const [result, setResult] = useState<BaccaratResult | null>(null);
  const clearBets = betsStore((state) => state.clearBets);
  const { resetBet } = placeBetStore();
  const { fetchUser } = useRefetchUser();
  const tableInfo = tableInfoStore((state) => state.tableInfo);
  const { isInteracted } = useUserInteractionStore();
  const { i18n } = useTranslation();

  const rawLang = i18n.language;
  const language: SupportedLang = ['en', 'kr', 'jp', 'cn', 'vn'].includes(rawLang)
    ? (rawLang as SupportedLang)
    : 'en';

  const bankerSound = SFX.bankerWins[language];
  const playerSound = SFX.playerWins[language];
  const tieSound = SFX.tieWins[language];

  const [bankerWinsPlay, { sound: bankerWinsSound }] = useSfxSound(bankerSound);
  const [playerWinsPlay, { sound: playerWinsSound }] = useSfxSound(playerSound);
  const [tieWinsPlay, { sound: tieWinsSound }] = useSfxSound(tieSound);

  const showResultsHandler = useCallback(
    (data: BaccaratResult) => {
      if (isInteracted) {
        if (data.winner === 'BANKER' && bankerWinsSound && !bankerWinsSound.playing()) {
          bankerWinsPlay();
        } else if (data.winner === 'PLAYER' && playerWinsSound && !playerWinsSound.playing()) {
          playerWinsPlay();
        } else if (data.winner === 'TIE' && tieWinsSound && !tieWinsSound.playing()) {
          tieWinsPlay();
        }
      }

      setResult(data);

      const timer = setTimeout(() => {
        fetchUser();
        setResult(null);
        resetBet(Number(tableInfo?.id));
        clearBets(Number(tableInfo?.id));
        clearTimeout(timer);
      }, 3000);
    },
    [
      isInteracted,
      bankerWinsSound,
      playerWinsSound,
      tieWinsSound,
      bankerWinsPlay,
      playerWinsPlay,
      tieWinsPlay,
      clearBets,
      fetchUser,
      resetBet,
      tableInfo,
    ]
  );

  useEffect(() => {
    socket.on('showReultsRoom', showResultsHandler);
    return () => {
      socket.off('showReultsRoom', showResultsHandler);
    };
  }, [showResultsHandler]);

  return result;
};
