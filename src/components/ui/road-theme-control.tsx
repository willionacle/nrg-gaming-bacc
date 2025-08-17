import { Box, SimpleGrid, Text } from '@mantine/core';
import useThemeStore from '@/store/themeStore';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import darkRoad from '@/assets/images/dark-road.png';
import lightRoad from '@/assets/images/light-road.png';
const themes = [
  {
    value: 'dark',
    img: darkRoad,
  },
  {
    value: 'light',
    img: lightRoad,
  },
];

const RoadThemeControl = () => {
  const { t } = useTranslation();
  const { scoreboardTheme, setScoreboardTheme } = useThemeStore();

  return (
    <Box mt="lg">
      <Text mb={2} fw="bolder">
        {t('Scoreboard Theme')}
      </Text>
      <SimpleGrid cols={2}>
        {themes.map((item, idx) => {
          const isSelected = item.value === scoreboardTheme;

          return (
            <Box
              key={idx}
              onClick={() => setScoreboardTheme(item.value as 'light' | 'dark')}
              className={clsx('road-theme-control', isSelected && 'active')}
            >
              <img src={item.img} alt={`${item.value} theme`} />
              <Text tt="capitalize" ta="center" my="xs">
                {t(item.value)}
              </Text>
            </Box>
          );
        })}
      </SimpleGrid>
    </Box>
  );
};

export default RoadThemeControl;
