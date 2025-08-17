import { PlayerKey, ScoreboardData2 } from '@/types';
import { Box, Group, Stack, Text } from '@mantine/core';
import clsx from 'clsx';

interface Props {
  results: ScoreboardData2['beadPlate'];
}

const playerKeys: PlayerKey[] = ['player', 'player_2', 'player_3'];

const NiuRoadmap = ({ results }: Props) => {
  const isLandscape = window.innerWidth > window.innerHeight;

  return (
    <Group
      className="niu-roadmap-wrapper"
      px={10}
      wrap="nowrap"
      align="center"
      justify="space-around"
      h="100%"
    >
      <Stack justify="center" align="center">
        <Box className="circle purple-circle">P1</Box>
        <Box className="circle purple-circle">P2</Box>
        <Box className="circle purple-circle">P3</Box>
      </Stack>
      {(!isLandscape ? results?.slice(-4) : results?.slice(-5))?.map((item, idx) => (
        <Stack className="niu-results" justify="center" key={idx}>
          {playerKeys?.map((key) => {
            const value = item?.results?.[key];
            const score = item?.scores?.[key];
            return (
              <Box
                key={key}
                className={clsx('result-niu', {
                  red: value != 'Lose' && key === 'banker',
                  blue: value != 'Lose' && key !== 'banker',
                })}
              >
                <Text>{score}</Text>
              </Box>
            );
          })}
        </Stack>
      ))}
    </Group>
  );
};

export default NiuRoadmap;
