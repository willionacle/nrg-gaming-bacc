import { IconX } from '@tabler/icons-react';
import NiuBtn from './niu-btn';
import { modals } from '@mantine/modals';
import { useNavigate, useParams } from 'react-router-dom';
import ModalContentWrapper2 from '@/providers/ModalContentWrapper2';
import { Box } from '@mantine/core';
import userInfoStore from '@/store/userStore';
import betsStore from '@/store/betsStore';
import { useEffect } from 'react';
import { socket } from '@/lib/client';
import { socketEvents } from '@/constants/socketEvents';
import { useTranslation } from 'react-i18next';

const ExitGameBtn = () => {
  const navigate = useNavigate();
  const userInfo = userInfoStore((state) => state.userInfo);
  const { id } = useParams();
  const tableId = Number(id);
  const { getSelectedSeat } = betsStore();
  const { t } = useTranslation();

  const handleLeaveTableSeat = async () => {
    const seatno = Number(getSelectedSeat(tableId).replace('PLAYER_', ''));

    const payload = {
      userid: userInfo?.id,
      tableid: tableId,
      seatno,
    };

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/leaveseat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo?.login_token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      socket.emit(socketEvents.LEAVE_AS_PLAYER, id);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleExit = () => {
    modals.open({
      size: 'md',
      children: (
        <ModalContentWrapper2
          hasSave
          onSave={() => {
            handleLeaveTableSeat();
            navigate('/');
          }}
          title={t('quit')}
        >
          <Box fw="600" fz={20} p="md" ta="center">
            {t('Do you want to exit the game?')}
          </Box>
          {/* <Text fz={12} ta="center" lh={1} mb="md">
            {t('If you have completed a bet, you can check the game results after reconnecting.')}
          </Text> */}
        </ModalContentWrapper2>
      ),
    });
  };

  useEffect(() => {
    const handleBeforeUnload = () => {
      handleLeaveTableSeat();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <NiuBtn tooltip="Exit" onClick={handleExit} circular>
      <IconX />
    </NiuBtn>
  );
};

export default ExitGameBtn;
