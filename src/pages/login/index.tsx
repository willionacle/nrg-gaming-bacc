import { LoginFormUser } from '@/components';
import Provider from '@/providers';
export default function UserLogin() {
  return (
    <Provider isLogin>
      <LoginFormUser />
    </Provider>
  );
}
