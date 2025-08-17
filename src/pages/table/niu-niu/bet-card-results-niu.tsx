import { Box, Group, Transition } from '@mantine/core';
import FlipCard from './flip-card';
import clsx from 'clsx';
import { CardResults } from '@/types';
import { useState } from 'react';

interface Props {
  cards: CardResults | null;
}

const BetCardsResultGroupNiu = ({
  option,
  result,
  cards,
}: {
  option: string;
  result: string[];
  cards: CardResults | null;
}) => {
  const [cardImgHeight, setCardImgHeight] = useState(0);
  const isRed = option.includes('banker');

  const displayLabels: Record<string, string> = {
    banker: 'DEALER',
    player: 'P1',
    player_2: 'P2',
    player_3: 'P3',
  };

  const winLabels: Record<string, string | undefined> = {
    banker: cards?.bankerNiu,
    player: cards?.playerNiu,
    player_2: cards?.player2Niu,
    player_3: cards?.player3Niu,
  };

  return (
    <Box
      className={clsx('card-result-group-niu-parent', isRed && 'red', !isRed && 'blue')}
      style={{ height: `${cardImgHeight + 55}px` }}
      p={10}
    >
      <Group
        mb="xs"
        wrap="nowrap"
        className={clsx('cg-header', isRed && 'red', !isRed && 'blue')}
        pos="relative"
        justify="space-between"
      >
        <Box ta="left" fw="600">
          {displayLabels[option]}
        </Box>
        <Box className={clsx('res-group-niu-parent-text-panel')}>
          {result.length >= 5 ? winLabels[option] : '---'}
        </Box>
      </Group>
      <Group wrap="nowrap" gap={4}>
        {Array.from({ length: 5 }).map((_, i) => (
          <FlipCard
            setCardImgHeight={setCardImgHeight}
            label={result.length === 5 ? (winLabels[option] as string) : ''}
            key={i}
            idx={i}
            item={result[i] ?? null}
            option={option}
          />
        ))}
      </Group>
    </Box>
  );
};

const BetCardResultsNiu = ({ cards }: Props) => {
  const allEmpty = (['banker', 'player', 'player_2', 'player_3'] as (keyof CardResults)[]).every(
    (key) => {
      const value = (cards ?? {})[key];
      return Array.isArray(value) && value.length === 0;
    }
  );

  return (
    <Box className="card-results-parent-niu">
      {Object.entries(cards || {}).map(([key, value]) => (
        // Array.isArray(value) &&
        // !allEmpty && (
        //   <BetCardsResultGroupNiu cards={cards} key={key} option={key} result={value} />
        // )
        <Transition
          mounted={Array.isArray(value) && !allEmpty}
          transition="fade-right"
          duration={400}
          timingFunction="ease"
          key={key}
        >
          {(styles) => (
            <Box style={styles} className="card-result-group-niu-parent-main">
              <BetCardsResultGroupNiu cards={cards} option={key} result={value} />
            </Box>
          )}
        </Transition>
      ))}
    </Box>
  );
};

export default BetCardResultsNiu;
