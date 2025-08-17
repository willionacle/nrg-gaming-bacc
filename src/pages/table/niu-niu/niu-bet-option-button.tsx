import { StaticChip } from '@/components/ui';
import { Box, Group, NumberFormatter, Text } from '@mantine/core';
import { IconUserCircle } from '@tabler/icons-react';
import clsx from 'clsx';

interface Props {
  onClick: (data: any) => void;
  setPos: (data: any) => void;
  label: string;
  isBetPlaced: boolean;
  getLatestChipByArea: string;
  getTotalAmountByArea: number;
  handleShowChip: 1 | 0;
  idx: number;
}

const NiuBetOptionButton = ({
  onClick,
  setPos,
  // label,
  getTotalAmountByArea,
  getLatestChipByArea,
  isBetPlaced,
  handleShowChip,
  idx,
}: Props) => {
  return (
    <Box
      onClick={onClick}
      className={clsx(
        'niu-bet-option-btn',
        handleShowChip && 'active',
        isBetPlaced && 'pointer-none'
      )}
    >
      {/* <Box className="label">{label}</Box> */}
      <Box className="niu-bet-option-winnings">
        <Box className="winnings-left">
          <NumberFormatter value={5000000} />
        </Box>
        <Box className="winnings-right">
          <NumberFormatter value={5000000} />
        </Box>
      </Box>
      <Text className="number">{idx + 1}</Text>
      <Box className="niu-bet-option-bottom">
        <Group align="center" gap="5">
          <IconUserCircle size={20} />
          <Text fw="bold">10</Text>
        </Group>
        <Text className="total-bet">
          <NumberFormatter value={5000000} />
        </Text>
      </Box>
      <StaticChip
        amount={getTotalAmountByArea}
        onPositionChange={setPos}
        opacity={handleShowChip}
        chip={getLatestChipByArea}
        niu
      />
    </Box>
  );
};

export default NiuBetOptionButton;
