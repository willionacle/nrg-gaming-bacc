import { socketEvents } from '@/constants/socketEvents';
import { socket } from '@/lib/client';
import userInfoStore from '@/store/userStore';
import { modals } from '@mantine/modals';
import { useNavigate, useParams } from 'react-router-dom';

const useLogout = () => {
  const { id } = useParams();
  const clearUserInfo = userInfoStore((state) => state.clearUserInfo);
  const navigate = useNavigate();

  const handleLogout = () => {
    socket.emit(socketEvents.LEAVE_AS_PLAYER, id);
    clearUserInfo();
    navigate('/login');
    modals.closeAll();
  };

  return { handleLogout };
};

export default useLogout;
