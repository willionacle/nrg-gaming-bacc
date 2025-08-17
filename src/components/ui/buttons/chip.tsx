'use client';
import {
  abbreviateNumber,
  getOriginalBoundingRect,
  // getOriginalPoint,
} from '@/utils/globalFunctions';
import { Box, Text } from '@mantine/core';
import { MouseEvent } from 'react';
import userInfoStore from '@/store/userStore';
import clsx from 'clsx';
interface Props {
  color: 'blue' | 'green' | 'pink' | 'yellow' | 'brown' | 'orange' | 'purple' | 'red' | string;
  amount: number;
  onClick: (data: any) => void;
  selected?: string;
  niu?: boolean;
}

const Chip = ({ color = 'yellow', amount, onClick, selected, niu = false }: Props) => {
  const { userInfo } = userInfoStore();
  const disabled = (userInfo?.tu_balance || 0) < amount;
  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    const rect = getOriginalBoundingRect(event.currentTarget);
    onClick({
      selected: selected == color ? '' : color,
      x: rect?.x,
      y: rect?.y,
    });
  };

  return (
    <Box
      className={clsx(
        'chip',
        `${color}-chip`,
        { active: selected === color && !disabled },
        { disabled: disabled },
        { niu }
      )}
      onClick={(event) => {
        handleClick(event);
      }}
    >
      <Text>{abbreviateNumber(amount)}</Text>
    </Box>
  );
};

export default Chip;
