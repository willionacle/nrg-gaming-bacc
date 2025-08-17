'use client';

import { TABLE_STATUS } from '@/constants/tableStatus';
import useRefetchUser from '@/hooks/useRefetchUser';
import { socket } from '@/lib/client';
import tableInfoStore from '@/store/tableInfoStore';
import { Text } from '@mantine/core';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import popBorder from '@/assets/images/pop-border.png';
interface SocketProps {
  tableID: number;
  timer: number;
  status?: number;
}

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

const TableStatusPop = () => {
  const { t } = useTranslation();
  const tableInfo = tableInfoStore((state) => state.tableInfo);
  const [tableStatus, setTableStatus] = useState<number>(tableInfo?.tc_status as number);
  const { fetchUser } = useRefetchUser();

  const statusLabel: Record<'0' | '6' | '7' | string, string> = {
    '0': 'Close Table',
    '6': 'Shuffling',
    '7': 'maintenance',
    '9': 'Round Voided',
  };

  const handleStatus = (data: SocketProps) => {
    if (data.tableID == tableInfo?.id) {
      setTableStatus(data.status as number);
      fetchUser();
    }
  };

  useEffect(() => {
    socket.on('updateTableLobby', handleStatus);
    return () => {
      socket.off('updateTableLobby', handleStatus);
    };
  }, []);

  useEffect(() => {
    setTableStatus(tableInfo?.tc_status as number);
  }, [tableInfo]);

  return (
    <>
      <AnimatePresence>
        {(tableStatus === TABLE_STATUS.closeTable ||
          tableStatus === TABLE_STATUS.shuffling ||
          tableStatus === TABLE_STATUS.maintenance ||
          tableStatus === TABLE_STATUS.void) && (
          <motion.div
            className="winner-pop-motion"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={fadeInUp}
          >
            <div className={`winner-pop winner-${tableStatus}`}>
              <img className="pop-border pop-border-1" src={popBorder} />
              <img className="pop-border pop-border-2" src={popBorder} />
              <Text className="text-gold-gradient2">{t(statusLabel[tableStatus.toString()])}</Text>
              {tableStatus === 9 && (
                <Text className="subtitle" fw={200} style={{ fontFamily: 'Poppins' }}>
                  {t('No worries! Your balance will be automatically returned.')}
                </Text>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TableStatusPop;
