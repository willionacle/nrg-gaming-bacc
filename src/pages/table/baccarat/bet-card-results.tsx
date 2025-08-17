import { Deal } from '@/types';
import { Group, Stack, Title } from '@mantine/core';
import clsx from 'clsx';

const BetCardResults = ({
  pos,
  cards,
  total,
}: {
  pos: string | null;
  cards: Deal['banker'] | Deal['player'];
  total: number | null;
}) => {
  const cardNew = pos === 'right' ? cards : cards?.slice()?.reverse();

  return (
    (cards || []).length > 0 && (
      <Stack align="center" className="card-results-parent">
        <Title ta="right" className="card-total" fz={40} mb="md" mr="20">
          {total}
        </Title>
        <Group w="100%" gap={5} className={`card-results ${pos}`} justify="center" align="center">
          {cardNew.slice(0, 3).map((item, idx) => (
            <img
              className={clsx({ landscape: cardNew.slice(0, 3).length === 3, 'fade-in': true })}
              key={idx}
              src={`/images/user-cards/${item.split('_').reverse().join('').toUpperCase()}.png`}
            />
          ))}
        </Group>
      </Stack>
    )
  );
};

export default BetCardResults;
