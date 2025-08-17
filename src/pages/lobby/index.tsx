import { CategoryFilter } from '@/components';
import LobbyCards from '@/components/sections/lobby/lobby-cards';
import tableInfoStore from '@/store/tableInfoStore';
import { ScrollArea } from '@mantine/core';
import { useEffect, useState } from 'react';
import { TableData } from '@/types';
import betsStore from '@/store/betsStore';
import { useParams } from 'react-router-dom';
import { modals } from '@mantine/modals';
import PagcorPopup from '@/components/ui/modals/pagcor-popup';

export default function Home() {
  const { id } = useParams();
  const tableId = Number(id);
  const setTableInfo = tableInfoStore((state) => state.setTableInfo);
  const [category, setCategory] = useState('');
  const { setSelectedSeat } = betsStore();

  useEffect(() => {
    setTableInfo({} as TableData);
    setSelectedSeat(tableId, '');
    // show pagcor pop up
    if (localStorage.getItem('justLoggedIn') === 'true') {
      modals.open({
        size: 'lg',
        children: <PagcorPopup />,
      });
      localStorage.removeItem('justLoggedIn');
    }
  }, []);

  return (
    <>
      <CategoryFilter setCategory={setCategory} />
      <ScrollArea h="calc(100% - 40px)" className="lobby-cont-wrapper" py="md">
        <LobbyCards category={category} />
      </ScrollArea>
    </>
  );
}
