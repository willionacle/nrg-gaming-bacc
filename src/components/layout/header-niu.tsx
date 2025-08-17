'use client';

// import { IconCurrencyWon, IconSpeakerphone, IconUser, IconUsers } from '@tabler/icons-react';
// import { Box, Divider, Group, NumberFormatter, Text } from '@mantine/core';
// import SettingsMenu from './settings-menu';
// import userInfoStore from '@/store/userStore';
// import tableInfoStore from '@/store/tableInfoStore';
import { Group, Text } from '@mantine/core';
import { useLocation } from 'react-router-dom';
import { ChangeTableBtn, FullscreenBtn, NiuBtn, SettingsModal } from '../ui';
import { IconSettings } from '@tabler/icons-react';
// import { abbreviateNumber } from '@/utils/globalFunctions';
import { useSfxSound } from '@/hooks/useSfx';
import { SFX } from '@/constants/sounds';
import { modals } from '@mantine/modals';
import { useTranslation } from 'react-i18next';
import RoomBasicInfo from './room-basic-info';
import ModalContentWrapper2 from '@/providers/ModalContentWrapper2';
import Dividend from '../ui/tables/dividend';
import { useUserInteractionStore } from '@/store/userInteractionStore';
import clsx from 'clsx';
import ExitGameBtn from '../ui/buttons/exit-game-btn';
import BetHistoryBtn from '../ui/buttons/bet-history-btn';
import logo from '@/assets/images/logo.png';

const HeaderNiu = () => {
  // const tableInfo = tableInfoStore((state) => state.tableInfo);
  // const userInfo = userInfoStore((state) => state.userInfo);
  const { setIsNiuBoardResultOpen, isNiuBoardResultOpen } = useUserInteractionStore();
  const { pathname } = useLocation();
  const isIngame = pathname.includes('table');
  const [playClick] = useSfxSound(SFX.click);
  const { t } = useTranslation();

  const handleOpenSettings = () => {
    modals.open({
      size: 'lg',
      children: (
        <ModalContentWrapper2 title={t('settings')}>
          <SettingsModal />
        </ModalContentWrapper2>
      ),
    });
  };

  const handleDividend = () => {
    modals.open({
      size: 'xl',
      children: (
        <ModalContentWrapper2 title={t('DIVIDEND')}>
          <Dividend />
        </ModalContentWrapper2>
      ),
    });
  };

  return (
    <header className={isIngame ? 'header-table header-niu' : ''}>
      <RoomBasicInfo />
      <div className="header-logo">
        <img src={logo} />
      </div>
      <Group gap="xs" wrap="nowrap" className="header-right">
        <NiuBtn tooltip="Exit" miw="120px" size="md" radius="md" onClick={handleDividend}>
          {t('DIVIDEND')}
        </NiuBtn>
        <ChangeTableBtn isMobile />
        <NiuBtn
          classProps={clsx(isNiuBoardResultOpen && 'active')}
          onClick={setIsNiuBoardResultOpen}
          tooltip={t('History Board')}
          circular
        >
          <Text fz="xs" lh="1" fw="700">
            OX
            <br />
            XO
          </Text>
        </NiuBtn>
        <BetHistoryBtn />
        <FullscreenBtn />
        <NiuBtn
          tooltip="settings"
          onClick={() => {
            handleOpenSettings(), playClick();
          }}
          circular
        >
          <IconSettings />
        </NiuBtn>
        <ExitGameBtn />
      </Group>
    </header>
  );
};

export default HeaderNiu;
