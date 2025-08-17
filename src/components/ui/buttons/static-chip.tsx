'use client';

import { useEffect, useRef } from 'react';
import { Box, BoxProps, Text } from '@mantine/core';
import { abbreviateNumber, getOriginalBoundingRect } from '@/utils/globalFunctions';

interface ChipProps extends BoxProps {
  onPositionChange?: (position: { x: number; y: number; width: number; height: number }) => void;
  amount: number;
  chip: string;
  niu?: boolean;
}

const StaticChip: React.FC<ChipProps> = ({
  onPositionChange,
  amount = 0,
  chip = 'blue',
  niu = false,
  ...props
}) => {
  const chipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chipRef.current) {
      const rect = getOriginalBoundingRect(chipRef.current);
      onPositionChange?.(rect as any);
    }
  }, []);

  return (
    <Box
      ref={chipRef}
      m="auto"
      className={`chip ${chip}-chip static-chip ${niu ? 'niu' : ''}`}
      {...props}
    >
      <Text>{abbreviateNumber(amount)}</Text>
    </Box>
  );
};

export default StaticChip;
