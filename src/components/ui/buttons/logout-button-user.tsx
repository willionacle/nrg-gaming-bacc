'use client';
import { Stack, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { IconLogout, IconQuestionMark } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import NiuBtn from './niu-btn';
import ModalContentWrapper2 from '@/providers/ModalContentWrapper2';
import useLogout from '@/hooks/useLogout';

export default function LogoutButtonUser() {
  const { t } = useTranslation();
  const { handleLogout } = useLogout();

  const handleLogOutConfirm = () =>
    modals.open({
      size: 'md',
      children: (
        <ModalContentWrapper2 hasSave onSave={handleLogout} title={t('Confirmation')}>
          <Stack align="center" mb="sm" mt={40}>
            {' '}
            <IconQuestionMark size={140} />
            <Text fz={20} fw={600} ta="center">
              {t('Are you sure you want to leave the game?')}
            </Text>
          </Stack>
        </ModalContentWrapper2>
      ),
    });

  return (
    <NiuBtn onClick={handleLogOutConfirm} tooltip={t('logout')} circular>
      <IconLogout />
    </NiuBtn>
  );
}
