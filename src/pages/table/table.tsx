'use client';
import GameBettingBoard from './game-betting-board';
import { useFetch } from '@/hooks/useFetch';
import { Box } from '@mantine/core';
import { useEffect } from 'react';
import { ServerAPIResponse, TableData } from '@/types';
import tableInfoStore from '@/store/tableInfoStore';
import { useParams } from 'react-router-dom';
import { InactivityAlert } from '@/components';

const Table = () => {
  const { id: tableId } = useParams();
  const setTableInfo = tableInfoStore((state) => state.setTableInfo);
  const { data } = useFetch<ServerAPIResponse<TableData>>(`getroom?tableid=${tableId}`);

  useEffect(() => {
    if (data) {
      setTableInfo({ ...data?.data, cards: data.cards } as TableData);
    }
  }, [data, tableId]);

  return (
    <Box h="100%">
      <InactivityAlert />
      <GameBettingBoard />
    </Box>
  );
};

export default Table;
