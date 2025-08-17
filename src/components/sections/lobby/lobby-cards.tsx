'use client';

import { useEffect, useState } from 'react';
import LobbyCard from '@/components/ui/lobby-card';
import { ServerAPIResponse, GameCategory } from '@/types';
import { useFetch } from '@/hooks/useFetch';
import { Box, Text } from '@mantine/core';
import { IconCards, IconPlayCard } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { GameLoading } from '@/components/ui';

interface Props {
  className?: string;
  category?: string;
}

const icons = {
  baccarat: IconPlayCard,
  niu: IconCards,
  'dragon-tiger': IconCards,
  roulette: IconCards,
} as const;

const LobbyCards = ({ className, category = 'all' }: Props) => {
  const { t } = useTranslation();
  const { data, refetch } = useFetch<ServerAPIResponse<GameCategory[]>>('channels');
  const [tables, setTables] = useState<GameCategory[] | undefined>([]);
  const isAllCat = category != 'all';

  useEffect(() => {
    setTables(data?.data);
  }, [data]);

  if (!data)
    return (
      <Box pos="fixed" style={{ zIndex: 1000 }}>
        <GameLoading />
      </Box>
    );

  return tables
    ?.filter((item) => (isAllCat ? item.tc_gameType === category : true))
    ?.map((item, idx) => {
      type GameType = keyof typeof icons;

      const Icon = icons[item.tc_gameType as GameType];

      return (
        <Box key={idx} mb="xl" w="100%">
          {!isAllCat && (
            <Text fz="h4" className="lobby-category-title" tt="capitalize">
              <Icon /> {t(item.tc_gameType)}
            </Text>
          )}
          <Box className="lobby-container" key={idx}>
            {item.channels.map((channel, idx2) => (
              <LobbyCard
                className={className}
                gameType={item.tc_gameType}
                {...channel}
                key={idx2}
                refetchChannels={refetch}
              />
            ))}
          </Box>
        </Box>
      );
    });
};

export default LobbyCards;
