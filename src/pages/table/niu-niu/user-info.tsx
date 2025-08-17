import { Box } from '@mantine/core';
// import MoneyContainer from './money-container';
// import { PurpleGoldCont } from '@/components/ui';
import userInfoStore from '@/store/userStore';
import flag from '@/assets/images/flags/en.svg';

const UserInfo = () => {
  const userInfo = userInfoStore((state) => state.userInfo);
  return (
    <Box pos="relative" className="user-info-parent">
      <img className="flag" src={flag} />
      <Box className="username">{userInfo?.username}</Box>
    </Box>
  );
};

export default UserInfo;
