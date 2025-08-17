'use client';

import { BaccaratResult } from '@/types';
import { Text } from '@mantine/core';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import popBorder from '@/assets/images/pop-border.png';
const fadeInUp = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3 },
  },
};

const charVariants = {
  hidden: { opacity: 0, y: 5 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.3,
    },
  }),
};

const WinnerPop = ({ result }: { result: BaccaratResult | null }) => {
  const { t } = useTranslation();
  const winnerText = result?.winner.toLowerCase();
  const message =
    winnerText === 'tie'
      ? `It's a tie!`
      : `${winnerText?.charAt(0).toUpperCase()}${winnerText?.slice(1)} Wins!`;

  return (
    <>
      <AnimatePresence>
        {!!result && (
          <motion.div
            className="winner-pop-motion"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={fadeInUp}
          >
            <div className={`winner-pop winner-${winnerText}`}>
              <img className="pop-border pop-border-1" src={popBorder} />
              <img className="pop-border pop-border-2" src={popBorder} />
              <Text className="text-gold-gradient2">
                {t(message)
                  .split('')
                  .map((char, index) => (
                    <motion.span
                      key={index}
                      custom={index}
                      variants={charVariants}
                      initial="hidden"
                      animate="visible"
                      className="inline-block"
                    >
                      {char}
                    </motion.span>
                  ))}
              </Text>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default WinnerPop;
