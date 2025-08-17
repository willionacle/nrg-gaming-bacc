import { DynamicGrid } from '@/components';
import { TABLE_STATUS } from '@/constants/tableStatus';
import { useFetch } from '@/hooks/useFetch';
import { useUpdateTableRoomSocket } from '@/hooks/useUpdateTableRoomSocket';
import { useUserInteractionStore } from '@/store/userInteractionStore';
import { ScoreboardData2, ServerAPIResponse } from '@/types';
import { Box, Text, Transition } from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

const HistoryBoard = () => {
  const { t } = useTranslation();
  const { isNiuBoardResultOpen, setIsNiuBoardResultOpen } = useUserInteractionStore();
  const { id: tableId } = useParams();
  const { data: resultData, refetch } = useFetch<ServerAPIResponse<ScoreboardData2>>(
    `getresults2?tableid=${tableId}`
  );
  const { updatedRoom } = useUpdateTableRoomSocket();
  const navigate = useNavigate();

  useEffect(() => {
    if (updatedRoom?.tableID == tableId) {
      if (
        updatedRoom?.status == TABLE_STATUS.nextRound ||
        updatedRoom?.status == TABLE_STATUS.dealingCard
      ) {
        refetch();
      }
    }
  }, [updatedRoom, tableId]);

  useEffect(() => {
    if (resultData) {
      navigate({
        pathname: `/table/${tableId}`,
        search: `?category=niu&round=${resultData?.data?.round_number}`,
      });
    }
  }, [resultData]);

  return (
    <Transition
      mounted={isNiuBoardResultOpen}
      transition="fade-left"
      duration={400}
      timingFunction="ease"
    >
      {(styles: any) => (
        <Box className="niu-history-board" style={styles}>
          <Box className="header">
            {t('History Board')}{' '}
            <IconX onClick={() => setIsNiuBoardResultOpen()} className="close" />
          </Box>
          <Box className="groups">
            {Object.entries(resultData?.data?.bigRoad || {}).map(([key, value], i) => {
              return (
                <Box key={key} className="history-group">
                  <Box className="history-cat">
                    <Text>{i + 1}</Text>
                  </Box>
                  <Box className="history-grid" bg="#fff">
                    <DynamicGrid board="NIUBIG" results={value} adjuster={3} />
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>
      )}
    </Transition>
  );
};

export default HistoryBoard;
