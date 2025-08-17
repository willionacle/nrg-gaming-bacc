import DynamicGrid from '@/components/ui/dynamic-grid';
import { ScoreboardData } from '@/types';
import { Box, Group, Text } from '@mantine/core';

interface Props {
  resultData: ScoreboardData | undefined;
}

const BettingRightBoard = ({ resultData }: Props) => {
  return (
    <Box className="result-board-right">
      <Group
        justify="space-evenly"
        align="center"
        gap={0}
        wrap="nowrap"
        className="result-board-top top-line"
      >
        {/* <Text>#{resultData?.round_number ?? 0}</Text> */}
        <Group className="rbr-details" justify="center" align="center" gap={5}>
          <Box className="result outline-blue" w={20}></Box>
          <Text>{resultData?.summary?.player}</Text>
        </Group>
        <Group className="rbr-details" justify="center" align="center" gap={5}>
          <Box className="result tie-2" w={20}></Box>
          <Text>{resultData?.summary?.tie}</Text>
        </Group>
        <Group className="rbr-details" justify="center" align="center" gap={5}>
          <Box className="result outline-red" w={20}></Box>
          <Text>{resultData?.summary?.banker}</Text>
        </Group>
        <Group className="rbr-details" justify="center" align="center" gap={5}>
          <Box className="result ppair-2" w={20}></Box>
          <Text>{resultData?.summary?.player_pair}</Text>
        </Group>
        <Group className="rbr-details" justify="center" align="center" gap={5}>
          <Box className="result bpair-2" w={20}></Box>
          <Text>{resultData?.summary?.banker_pair}</Text>
        </Group>
        {/* <Group className="predectors" h="100%">
          <Group wrap="nowrap" className="predector-btn predector-blue" gap={3}>
            <Text fz="xs" fw={700}>
              P
            </Text>
            <Box className="result outline-blue" w={15} h={15}></Box>
            <Box className="result fill-blue" w={15} h={15}></Box>
            <Box className="result line-blue" w={15} h={15}></Box>
          </Group>
          <Group wrap="nowrap" className="predector-btn predector-red" gap={3}>
            <Text fz="xs" fw={700}>
              B
            </Text>
            <Box className="result outline-red" w={15} h={15}></Box>
            <Box className="result fill-red" w={15} h={15}></Box>
            <Box className="result line-red" w={15} h={15}></Box>
          </Group>
        </Group> */}
      </Group>
      <Box className="result-board watermark">
        <Box className="main-road">
          <DynamicGrid results={resultData?.bigRoad} adjuster={0.1} board="BIG" />
        </Box>
        <Box className="small-boxes">
          <Box className="bigeye-road">
            <DynamicGrid results={resultData?.bigEyeBoy} adjuster={0.1} board="BIGEYEBOY" />
          </Box>
          <Box className="bottom-road">
            <Box className="small-road">
              <DynamicGrid results={resultData?.smallRoad} board="SMALL" adjuster={0.1} />
            </Box>
            <Box className="cock-roach-road">
              <DynamicGrid results={resultData?.cockroachPig} board="COCKROACH" adjuster={0.1} />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default BettingRightBoard;
