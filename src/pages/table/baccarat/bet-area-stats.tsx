import { BetType } from '@/types';
import { getBaccaratPayoutRatio } from '@/utils/globalFunctions';
import { Group, GroupProps, Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';
// import { IconCurrencyWon, IconUser } from '@tabler/icons-react';

interface Props extends GroupProps {
  title: BetType | string;
  bets: number;
  users: number;
}

const BetAreaStats = ({ title, bets, users, ...props }: Props) => {
  const { t } = useTranslation();
  const handleColor = () => {
    if (title.includes('B')) {
      return '#ff6e72';
    } else if (title.includes('P')) {
      return '#5284d8';
    } else {
      return '#5ad782';
    }
  };

  return (
    <Group className="betting-stats" align="center" justify="space-around" {...props} gap={0}>
      <Group align="center" gap={5} justify="center">
        <Text fz={14} fw={700}>
          {t(title)}
        </Text>
        <Text fz={14} fw={700} c={handleColor()}>
          {getBaccaratPayoutRatio(title)}
        </Text>
      </Group>
      {/* <Group align="center" gap={5} justify="center">
        <IconCurrencyWon size={15} color={handleColor()} />
        <Text fz={10} c={handleColor()}>
          <NumberFormatter value={bets} />
        </Text>
      </Group>
      <Group align="center" gap={5} justify="center">
        <IconUser size={15} color={handleColor()} />
        <Text fz={10} c={handleColor()}>
          <NumberFormatter value={users} />
        </Text>
      </Group> */}
    </Group>
  );
};

export default BetAreaStats;
