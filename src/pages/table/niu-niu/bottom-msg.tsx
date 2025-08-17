import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface Props {
  label: string;
}

const BottomMsg = ({ label }: Props) => {
  const { t } = useTranslation();
  return (
    <motion.div
      className="bottom-msg"
      animate={{
        scale: [1, 1.08, 1],
        opacity: [1, 0.9, 1],
      }}
      transition={{
        duration: 1.2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {t(label)}
    </motion.div>
  );
};

export default BottomMsg;
