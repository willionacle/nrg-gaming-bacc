import DynamicGrid from '@/components/ui/dynamic-grid';
import { ScoreboardData, ScoreboardData2 } from '@/types';
import { Box, Group } from '@mantine/core';

interface Props {
  resultData: ScoreboardData | ScoreboardData2 | undefined;
}

const BettingRightBoardNiu = ({ resultData }: Props) => {
  return (
    <Box className="result-board-right result-board-right-niu">
      <Group
        justify="space-around"
        align="center"
        gap={0}
        wrap="nowrap"
        className="result-board-top top-line"
      >
        <Box className="circle blue-circle">P1</Box>
        <Box className="circle blue-circle">P2</Box>
        <Box className="circle blue-circle">P3</Box>
      </Group>
      <Group wrap="nowrap" gap={0} className="result-board watermark">
        <DynamicGrid
          results={(resultData?.bigRoad as ScoreboardData2['bigRoad'])?.player}
          board="NIUBIG"
          adjuster={2}
        />
        <DynamicGrid
          results={(resultData?.bigRoad as ScoreboardData2['bigRoad'])?.player_2}
          board="NIUBIG"
          adjuster={2}
        />
        <DynamicGrid
          results={(resultData?.bigRoad as ScoreboardData2['bigRoad'])?.player_3}
          board="NIUBIG"
          adjuster={2}
        />
      </Group>
    </Box>
  );
};

export default BettingRightBoardNiu;
