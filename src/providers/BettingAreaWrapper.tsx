import { TABLE_STATUS } from '@/constants/tableStatus';
import tableInfoStore from '@/store/tableInfoStore';
import { useUserInteractionStore } from '@/store/userInteractionStore';
import { Box } from '@mantine/core';
import { useEffect } from 'react';

const BettingAreaWrapper = ({
  showControls,
  children,
}: {
  showControls: number | undefined;
  children: React.ReactNode;
}) => {
  const setIsBettingAreaOpenOnLoad = useUserInteractionStore(
    (state) => state.setIsBettingAreaOpenOnLoad
  );
  const tableInfo = tableInfoStore((state) => state.tableInfo);
  const openBetting =
    showControls == TABLE_STATUS.startGame ||
    showControls == TABLE_STATUS.nextRound ||
    tableInfo?.tc_status == TABLE_STATUS.startGame ||
    tableInfo?.tc_status == TABLE_STATUS.nextRound;

  useEffect(() => {
    setIsBettingAreaOpenOnLoad(openBetting);
  }, []);

  return (
    <>
      <Box className={`betting-area betting-area-mid ${openBetting ? 'betting-open' : ''}`}>
        {children}
      </Box>
    </>
  );
};

export default BettingAreaWrapper;
