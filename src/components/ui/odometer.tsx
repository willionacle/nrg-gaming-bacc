import { Text } from '@mantine/core';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface OdometerProps {
  value: string | number;
  duration?: number;
}

type Dir = 'up' | 'down' | 'none';

export default function Odometer({ value, duration = 0.3 }: OdometerProps) {
  const [digits, setDigits] = useState<string[]>([]);
  const [dir, setDir] = useState<Dir>('none');
  const prevNumeric = useRef<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Update displayed characters
  useEffect(() => {
    setDigits(String(value).split(''));
  }, [value]);

  // Detect increase/decrease and start 2s flash timer
  useEffect(() => {
    const current = Number(String(value).replace(/[^\d.-]/g, '')); // handles "1,234.56" etc.
    const prev = prevNumeric.current;

    let nextDir: Dir = 'none';
    if (Number.isFinite(current) && prev !== null && Number.isFinite(prev)) {
      nextDir = current > prev ? 'up' : current < prev ? 'down' : 'none';
    }

    setDir(nextDir);
    prevNumeric.current = current;

    // reset any existing timer, then clear color after 2s
    if (timerRef.current) clearTimeout(timerRef.current);
    if (nextDir !== 'none') {
      timerRef.current = setTimeout(() => setDir('none'), 2000);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [value]);

  const color = dir === 'up' ? 'green' : dir === 'down' ? 'red' : undefined;

  return (
    <div style={{ display: 'flex', gap: '0px', alignItems: 'center' }}>
      {digits.map((digit, i) => (
        <div
          key={i}
          style={{
            overflow: 'hidden',
            height: '1rem',
            width: '0.7rem',
            position: 'relative',
          }}
        >
          <AnimatePresence initial={false} mode="popLayout">
            <motion.span
              key={digit}
              initial={{ y: '-100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ duration }}
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                textAlign: 'center',
              }}
            >
              <Text fw={700} c={color}>
                {digit}
              </Text>
            </motion.span>
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
