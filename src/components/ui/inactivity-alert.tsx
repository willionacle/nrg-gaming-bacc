import { socketEvents } from '@/constants/socketEvents';
import { socket } from '@/lib/client';
import ModalContentWrapper2 from '@/providers/ModalContentWrapper2';
import userInfoStore from '@/store/userStore';
import { Stack, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { IconAlertTriangle } from '@tabler/icons-react';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

const InactivityAlert: React.FC = () => {
  const { userInfo } = userInfoStore();
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const INACTIVITY_LIMIT = 3 * 60 * 1000; // 3 minutes
  // const INACTIVITY_LIMIT = 1000; // 3 minutes

  const resetTimer = () => {
    if (userInfo?.tp_partnerid === 1) return;

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      popUp();
      const delayTimer = setTimeout(() => {
        clearTimeout(delayTimer);
        if (id) {
          socket.emit(socketEvents.LEAVE_AS_PLAYER, id);
        }
        modals.closeAll();
        navigate('/');
      }, 3000);
    }, INACTIVITY_LIMIT);
  };

  const popUp = () =>
    modals.open({
      size: 'md',
      closeOnClickOutside: false,
      children: (
        <ModalContentWrapper2 onClose={() => navigate('/')} title={t('Inactivity Detected')}>
          <Stack align="center" mb="sm" mt={40}>
            {' '}
            <IconAlertTriangle size={140} />
            <Text fz={20} fw={600} ta="center">
              {t("You've been inactive for 3 minutes. You will be redirected to the lobby.")}
            </Text>
          </Stack>
        </ModalContentWrapper2>
      ),
    });

  useEffect(() => {
    const events: (keyof DocumentEventMap)[] = [
      'mousemove',
      'keydown',
      'mousedown',
      'touchstart',
      'scroll',
    ];

    events.forEach((event) => window.addEventListener(event, resetTimer, { passive: true }));

    resetTimer(); // Start timer on mount

    return () => {
      events.forEach((event) => window.removeEventListener(event, resetTimer));
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return null;
};

export default InactivityAlert;
