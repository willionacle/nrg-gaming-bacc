import { usePlayNiuSound } from '@/hooks/usePlayNiuSound';
import { Box } from '@mantine/core';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import cardBackface from '@/assets/images/card-backface.png';

const FlipCard = ({
  item,
  label,
  setCardImgHeight,
  idx,
  option,
}: {
  item: string | null;
  label: string;
  setCardImgHeight?: (data: number) => void;
  idx: number;
  option: string;
}) => {
  usePlayNiuSound(idx, label, option);
  const [flipped, setFlipped] = useState(false);
  const backImgRef = useRef<HTMLImageElement | null>(null);
  const frontImgRef = useRef<HTMLImageElement | null>(null);

  const imageName = item?.split('_').reverse().join('').toUpperCase();

  useEffect(() => {
    if (item) {
      setFlipped(true);
    }
  }, [item]);

  useEffect(() => {
    const updateHeight = () => {
      const height = frontImgRef.current?.offsetHeight || backImgRef.current?.offsetHeight;
      if (height && setCardImgHeight) {
        setCardImgHeight(height);
      }
    };

    updateHeight();

    window.addEventListener('resize', updateHeight);

    return () => {
      window.removeEventListener('resize', updateHeight);
    };
  }, [item, setCardImgHeight]);

  return (
    <Box w={55} className="flip-card" style={{ perspective: '1000px' }}>
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.5 }}
        style={{
          width: '100%',
          transformStyle: 'preserve-3d',
          position: 'relative',
        }}
      >
        {/* Front face (Back of card) */}
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            top: 0,
            left: 0,
          }}
        >
          <img
            ref={backImgRef}
            src={cardBackface}
            onLoad={() => {
              if (backImgRef.current && setCardImgHeight) {
                setCardImgHeight(backImgRef.current.offsetHeight);
              }
            }}
          />
        </div>

        {/* Back face (Actual card) */}
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            top: 0,
            left: 0,
          }}
        >
          {item && (
            <img
              ref={frontImgRef}
              src={`/images/cards/${imageName}.svg`}
              onLoad={() => {
                if (frontImgRef.current && setCardImgHeight) {
                  setCardImgHeight(frontImgRef.current.offsetHeight);
                }
              }}
            />
          )}
        </div>
      </motion.div>
    </Box>
  );
};

export default FlipCard;
