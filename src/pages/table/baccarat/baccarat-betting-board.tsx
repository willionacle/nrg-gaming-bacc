import { Box } from '@mantine/core';
import BettingArea from './betting-area';
import BettingLeftBoard from './betting-left-board';
import BettingRightBoard from './betting-right-board';
import { ScoreboardData, ChipProps } from '@/types';
import WinnerPop from './winner-pop';
import LiveStreamPlayer from '@/components/ui/live-stream-player';
import { useShowResultsSocket } from '@/hooks/useShowResultsSocket';
import TableStatusPop from './table-status-pop';
import tableInfoStore from '@/store/tableInfoStore';
// import tableInfoStore from '@/store/tableInfoStore';

interface Props {
  resultData: ScoreboardData | undefined;
  isChipAnimating: boolean;
  setIsChipAnimating: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedChips: React.Dispatch<React.SetStateAction<ChipProps[]>>;
  refetchBoardResults: () => void;
}

const BaccaratBettingBoard = ({
  resultData,
  isChipAnimating,
  setIsChipAnimating,
  setSelectedChips,
  refetchBoardResults,
}: Props) => {
  const result = useShowResultsSocket();
  const { tableInfo } = tableInfoStore();

  return (
    <>
      <WinnerPop result={result} />
      <TableStatusPop />
      <LiveStreamPlayer className="bacc-livestream" src={tableInfo?.tc_stream_url as string} />
      <Box className="betting-board-area">
        <BettingLeftBoard resultData={resultData} />
        <BettingArea
          isChipAnimating={isChipAnimating}
          setIsChipAnimating={setIsChipAnimating}
          result={result}
          setSelectedChips={setSelectedChips}
          refetchBoardResults={refetchBoardResults}
        />
        <BettingRightBoard resultData={resultData} />
      </Box>
    </>
  );
};

export default BaccaratBettingBoard;
