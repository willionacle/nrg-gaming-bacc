import { Box, Text } from '@mantine/core';
import { motion } from 'framer-motion';
import { abbreviateNumber, isLandscape } from '@/utils/globalFunctions';
import { ChipProps } from '@/types';

interface ChipMotionProps {
  chip: ChipProps;
  index: number;
  category: string | null;
  onAnimationComplete: () => void;
}

export default function ChipMotion({
  chip,
  index,
  category,
  onAnimationComplete,
}: ChipMotionProps) {
  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, scale: 0.5, y: chip.yStart, x: chip.xStart }}
      animate={{
        opacity: 1,
        scale: 1,
        x: chip.xEnd,
        y: chip.yEnd,
      }}
      transition={{ duration: isLandscape() ? 0.2 : 0, ease: 'easeInOut' }}
      onAnimationComplete={onAnimationComplete}
      style={{
        position: 'absolute',
        zIndex: 3,
      }}
    >
      <Box
        m="auto"
        className={`chip ${chip.chip}-chip pointer-none ${category === 'niu' ? 'niu' : ''}`}
        style={{ zIndex: 999999 }}
        w={category === 'niu' ? 64 : 50}
      >
        <Text>{abbreviateNumber(chip.amount)}</Text>
      </Box>
    </motion.div>
  );
}
