'use client';

import { Timer } from '@/components/ui';
import { useEffect, useState, useCallback } from 'react';
import tableInfoStore from '@/store/tableInfoStore';
import { socket } from '@/lib/client';
import { NiuSeatSummary } from '@/types';

interface Props {
  tableID: number;
  timer: number;
  summary: NiuSeatSummary;
  status?: number;
}

const TableTimer = ({
  classProps,
  setSummary,
  setTime,
}: {
  classProps?: string;
  setSummary?: (data: NiuSeatSummary) => void;
  setTime?: (data: number) => void;
}) => {
  const tableInfo = tableInfoStore((state) => state.tableInfo);
  const [remainingTime, setRemainingTime] = useState<number>(0);

  const durationHandler = useCallback(
    (data: Props) => {
      if (data.tableID == tableInfo?.id) {
        setRemainingTime(data.timer);
        setTime?.(data.timer);
        if (data.summary && data.timer < 2) setSummary?.(data.summary);
      }
    },
    [tableInfo?.tc_id]
  );

  useEffect(() => {
    socket.on('startTimerRoom', durationHandler);

    return () => {
      socket.off('startTimerRoom', durationHandler);
    };
  }, [durationHandler]);

  // reset timer when table change
  useEffect(() => {
    setRemainingTime(0);
  }, [tableInfo]);

  if (remainingTime === 0) return;

  return <Timer duration={tableInfo?.tc_timer} classProps={classProps} current={remainingTime} />;
};

export default TableTimer;
