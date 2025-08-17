'use client';
import { Box, Text } from '@mantine/core';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

type TimerProps = {
  duration?: number;
  current?: number;
  classProps?: string;
};

export default function Timer({ duration = 10, current = 10, classProps }: TimerProps) {
  const [color, setColor] = useState<string>('#00ff00');

  const radius = 20;
  const strokeWidth = 2;
  const circumference = 2 * Math.PI * radius;

  const clampedTime = Math.max(0, Math.min(current, duration));
  const progress = (clampedTime / duration) * circumference;
  const progressAngle = (1 - clampedTime / duration) * 360;

  useEffect(() => {
    if (clampedTime <= 5) {
      setColor('red');
    } else {
      setColor('#00ff00');
    }
  }, [clampedTime]);

  return (
    <Box
      w={50}
      h={50}
      pos="relative"
      className={clsx(`timer content-center ${classProps}`, current > 0 && 'animate')}
    >
      <svg
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          transform: 'rotate(-90deg)',
        }}
        viewBox="0 0 50 50"
      >
        <circle
          cx="25"
          cy="25"
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <circle
          cx="25"
          cy="25"
          r={radius}
          stroke="#a5a0ff"
          strokeWidth={strokeWidth + 1}
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={progress}
          style={{
            transition: 'all 1s linear',
          }}
        />
      </svg>

      <Box
        pos="absolute"
        w={12}
        h={12}
        style={{
          transform: `rotate(${progressAngle - 90}deg) translate(20px)`,
          transformOrigin: 'center',
          transition: 'transform 1s linear',
          backgroundColor: color,
          filter: `drop-shadow(0 0 6px ${color})`,
          borderRadius: '100px',
        }}
      />

      <Text pos="relative" className="notranslate" c={color}>
        {clampedTime}
      </Text>
    </Box>
  );
}
