import { useEffect, useState, useCallback } from 'react';
import { socket } from '@/lib/client';
import { useSfxSound } from '@/hooks/useSfx';
import { SFX } from '@/constants/sounds';
import { TABLE_STATUS } from '@/constants/tableStatus';
import tableInfoStore from '@/store/tableInfoStore';
import { placeBetStore } from '@/store/placeBetStore';
import { useUserInteractionStore } from '@/store/userInteractionStore';
import betsStore from '@/store/betsStore';
import { useTranslation } from 'react-i18next';

interface Props {
  tableID: number;
  timer: number;
  status?: number;
}

type SupportedLang = 'en' | 'kr' | 'jp' | 'cn' | 'vn';

export const useUpdateTableRoomSocket = () => {
  const { i18n } = useTranslation();
  const rawLang = i18n.language;
  const language: SupportedLang = ['en', 'kr', 'jp', 'cn', 'vn'].includes(rawLang)
    ? (rawLang as SupportedLang)
    : 'en';

  const startBettingSoundSrc = SFX.startBetting[language];
  const stopBettingSoundSrc = SFX.stopBetting[language];

  const [startBettingPlay, { sound: soundStartBetting }] = useSfxSound(startBettingSoundSrc);
  const [stopBettingPlay, { sound: soundStopBetting }] = useSfxSound(stopBettingSoundSrc);

  const { tableInfo, setTableInfo } = tableInfoStore();
  const [updatedRoom, setUpdatedRoom] = useState<Props | null>(null);
  const { resetBet } = placeBetStore();
  const clearBets = betsStore((state) => state.clearBets);
  const { isInteracted } = useUserInteractionStore();

  const updateTableHandler = useCallback(
    (data: Props) => {
      setUpdatedRoom(data);

      if (data?.tableID !== tableInfo?.id) return;

      if (data?.status === TABLE_STATUS.startGame || data?.status === TABLE_STATUS.nextRound) {
        if (isInteracted && soundStartBetting && !soundStartBetting.playing()) {
          resetBet(tableInfo?.id);
          clearBets(tableInfo?.id);
          startBettingPlay();
        }
      } else if (data?.status === TABLE_STATUS.dealingCard) {
        if (isInteracted && soundStopBetting && !soundStopBetting.playing()) {
          stopBettingPlay();
        }
      }

      setTableInfo({ ...tableInfo, tc_status: Number(data?.status) });
    },
    [
      isInteracted,
      tableInfo?.id,
      soundStartBetting,
      soundStopBetting,
      startBettingPlay,
      stopBettingPlay,
      clearBets,
      resetBet,
      tableInfo,
      setTableInfo,
    ]
  );

  useEffect(() => {
    socket.on('updateTableRoom', updateTableHandler);
    return () => {
      socket.off('updateTableRoom', updateTableHandler);
    };
  }, [updateTableHandler]);

  return { updatedRoom };
};
