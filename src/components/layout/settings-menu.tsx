'use client';

import { Group } from '@mantine/core';
import { IconSettings } from '@tabler/icons-react';
import { modals } from '@mantine/modals';
import { useTranslation } from 'react-i18next';

import ModalContentWrapper2 from '@/providers/ModalContentWrapper2';
import SettingsModal from '../ui/modals/settings-modal';
import { NiuBtn, FullscreenBtn } from '@/components';
import LogoutButtonUser from '../ui/buttons/logout-button-user';
import ExitGameBtn from '../ui/buttons/exit-game-btn';
import { useSfxSound } from '@/hooks/useSfx';
import { SFX } from '@/constants/sounds';
import BetHistoryBtn from '../ui/buttons/bet-history-btn';

interface Props {
  isIngame?: boolean;
}

const SettingsMenu = ({ isIngame }: Props) => {
  const { t } = useTranslation();
  const [playClick] = useSfxSound(SFX.click);

  const handleOpenSettings = () => {
    playClick();
    modals.open({
      size: 'lg',
      children: (
        <ModalContentWrapper2 title={t('settings')}>
          <SettingsModal />
        </ModalContentWrapper2>
      ),
    });
  };

  const renderDesktopMenu = () => (
    <Group className="header-btns" align="center" gap="sm">
      {/* {isIngame && (
        <Box className="mobile">
          <ChangeTableBtn isMobile />
        </Box>
      )} */}
      <BetHistoryBtn />
      <FullscreenBtn />
      <NiuBtn onClick={handleOpenSettings} tooltip="settings" circular>
        <IconSettings />
      </NiuBtn>
      {isIngame ? <ExitGameBtn /> : <LogoutButtonUser />}
    </Group>
  );

  return <>{renderDesktopMenu()}</>;
};

export default SettingsMenu;
