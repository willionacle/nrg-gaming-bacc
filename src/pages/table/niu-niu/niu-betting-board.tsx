import useReceivedCardsSocket from '@/hooks/useReceivedCardsSocket';
import { BettingSeatTop, NiuControls, NiuWinnerPop } from '.';
import BetCardResultsNiu from './bet-card-results-niu';
import { MyBet, NiuBettingProps, NiuSeatSummary, ServerAPIResponse } from '@/types';
import { useEffect, useState } from 'react';
import HistoryBoard from './history-board';
import { TableTimer } from '@/components';
import { useUpdateTableRoomSocket } from '@/hooks/useUpdateTableRoomSocket';
import tableInfoStore from '@/store/tableInfoStore';
import { useFetch } from '@/hooks/useFetch';
import { useParams } from 'react-router-dom';
import userInfoStore from '@/store/userStore';
import LiveStreamPlayer from '@/components/ui/live-stream-player';
import { useShowResultsSocket } from '@/hooks/useShowResultsSocket';
import betsStore from '@/store/betsStore';
import { modals } from '@mantine/modals';
import ModalContentWrapper2 from '@/providers/ModalContentWrapper2';
import { TABLE_STATUS } from '@/constants/tableStatus';

const NiuBettingBoard = ({
  setSelectedChips,
  isChipAnimating,
  setIsChipAnimating,
}: NiuBettingProps) => {
  const { id } = useParams();
  const tableId = Number(id);
  const { cardResults } = useReceivedCardsSocket();
  const [selectedChip, setSelectedChip] = useState({
    amount: 0,
    chip: '',
    x: 0,
    y: 0,
  });
  const { updatedRoom } = useUpdateTableRoomSocket();
  const { tableInfo } = tableInfoStore();
  const { userInfo } = userInfoStore();
  const result = useShowResultsSocket();
  const { setSelectedBetOption } = betsStore();
  const { data: myBetData, refetch } = useFetch<ServerAPIResponse<MyBet>>(
    `mybet?tc_id=${tableId}&tu_userid=${userInfo?.id}`
  );
  const [seatSummary, setSeatSummary] = useState<NiuSeatSummary>();
  const [msg, setMsg] = useState('');
  const status = updatedRoom?.status ?? tableInfo?.tc_status;

  // const handleOpenWarning = () => {
  //   modals.open({
  //     size: 'md',
  //     children: (
  //       <ModalContentWrapper2 title={<IconAlertTriangleFilled color="#f70075" size={60} />}>
  //         <Box fw="600" fz={20} p="md" ta="center">
  //           You have been redirected to lobby due to inactivity.
  //         </Box>
  //       </ModalContentWrapper2>
  //     ),
  //   });
  // };

  const handleOpenWin = () => {
    modals.open({
      size: '70rem',
      children: (
        <ModalContentWrapper2 hasBtns={false}>
          <NiuWinnerPop />
        </ModalContentWrapper2>
      ),
    });
  };

  useEffect(() => {
    if (status === TABLE_STATUS.nextRound) refetch();
  }, [status]);

  //trigger win
  useEffect(() => {
    if (result) {
      setMsg('Waiting for next round');
      setSelectedBetOption(tableId, '');
      setSeatSummary(undefined);
      // open result modal
      handleOpenWin();

      //close result modal
      let timeOut = setTimeout(() => {
        clearTimeout(timeOut);
        modals.closeAll();
      }, 3000);
    }
  }, [result]);

  return (
    <>
      <BetCardResultsNiu cards={cardResults} />
      <HistoryBoard />
      <TableTimer setSummary={setSeatSummary} classProps="niu-table-timer" />
      <LiveStreamPlayer
        className="niu-livestream"
        src="https://video.nrgzone.net:5443/WebRTCApp/play.html?id=J5ImtAiVqQVKsX6D3455307388430"
      />
      <BettingSeatTop
        setSelectedChips={setSelectedChips}
        isChipAnimating={isChipAnimating}
        setIsChipAnimating={setIsChipAnimating}
        selectedChip={selectedChip}
        tableStatus={status as number}
        myBetData={myBetData?.data}
        seatSummary={seatSummary}
      />
      <NiuControls
        msg={msg}
        setMsg={setMsg}
        onBet={refetch}
        onChipClick={setSelectedChip}
        tableStatus={status as number}
      />
    </>
  );
};

export default NiuBettingBoard;
