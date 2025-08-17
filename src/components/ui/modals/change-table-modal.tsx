'use client';

import { ScrollArea } from '@mantine/core';
import { LobbyCards } from '@/components/sections';

const ChangeTableModal = () => {
  return (
    <>
      <ScrollArea.Autosize
        mah="calc(100vh - 300px)"
        className="change-table-modal"
        mb="md"
        mt="md"
        scrollbars="y"
      >
        <LobbyCards className="w-full" />
      </ScrollArea.Autosize>
    </>
  );
};

export default ChangeTableModal;
