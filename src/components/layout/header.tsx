import { IconCurrencyWon, IconSpeakerphone, IconUser } from '@tabler/icons-react';
import { Box, Divider, Group } from '@mantine/core';
import SettingsMenu from './settings-menu';
import userInfoStore from '@/store/userStore';
import tableInfoStore from '@/store/tableInfoStore';
import { useLocation } from 'react-router-dom';
import HeaderNiu from './header-niu';
import logo from '@/assets/images/logo.png';
import RoomBasicInfo from './room-basic-info';
import { Odometer } from '../ui';

const Header = () => {
  const tableInfo = tableInfoStore((state) => state.tableInfo);
  const userInfo = userInfoStore((state) => state.userInfo);
  const { pathname } = useLocation();
  const isIngame = pathname.includes('table');
  const isNiu = tableInfo?.tc_gameType == 'niu';

  if (isNiu) return <HeaderNiu />;

  return (
    <header className={isIngame ? 'header-table' : ''}>
      <Box className="header-left">
        {isIngame && <RoomBasicInfo />}
        {!isIngame && (
          <Box className="notice-container desktop">
            <IconSpeakerphone />
            <Box className="notice-text-container">
              <Box className="notice-text">
                🎲 LIVE BACCARAT: Place Your Bets Now! 💰 Big Wins Await! Join the Action! 🏆
              </Box>
            </Box>
          </Box>
        )}
      </Box>
      <Box className="header-logo">
        <img src={logo} />
      </Box>
      <Box className="header-right">
        <Group gap={2} className="balance" align="center">
          <IconCurrencyWon /> <Odometer value={(userInfo?.tu_balance ?? 0).toLocaleString()} />
        </Group>
        <Divider orientation="vertical" className="desktop" mr={40} />
        <Box className="user-wrapper">
          <Box className="user-icon">
            <IconUser />
          </Box>
          <Box className="user-name notranslate">
            <IconUser />
            {userInfo?.username}
          </Box>
        </Box>
        <SettingsMenu isIngame={isIngame} />
      </Box>
    </header>
  );
};

export default Header;
