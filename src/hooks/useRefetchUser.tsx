import { useFetch } from '@/hooks/useFetch';
import userInfoStore from '@/store/userStore';
import { ServerAPIResponse, User } from '@/types';

const useRefetchUser = () => {
  const { refetch } = useFetch<ServerAPIResponse<User>>(`getuser`, { autoFetch: false });
  const setUserInfo = userInfoStore((state) => state.setUserInfo);

  const fetchUser = async () => {
    const res = await refetch();
    setUserInfo(res?.data as User);
  };

  return {
    fetchUser,
  };
};

export default useRefetchUser;
