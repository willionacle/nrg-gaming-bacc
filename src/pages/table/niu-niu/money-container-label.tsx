import { PurpleGoldCont } from '@/components/ui';
import { Box, Text } from '@mantine/core';
import MoneyContainer from './money-container';

interface Props {
  label: string;
  value: number;
  isBw?: boolean;
}
const MoneyContainerLabel = ({ label, value, isBw = false }: Props) => {
  return (
    <Box ta="center" className="money-container">
      <Text mr="sm" className="label">
        {label}
      </Text>
      <PurpleGoldCont
        pos="relative"
        px={5}
        py={5}
        classProp={`money-container-label ${isBw ? 'black-white' : ''}`}
      >
        <MoneyContainer value={value} />
      </PurpleGoldCont>
    </Box>
  );
};

export default MoneyContainerLabel;
