import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import userInfoStore from '@/store/userStore';
import Provider from '@/providers';

interface DecodedToken {
  exp: number;
}

function isTokenValid(token: string) {
  try {
    const decoded: DecodedToken = jwtDecode(token);
    const isExpired = decoded.exp * 1000 < Date.now();
    return !isExpired;
  } catch (e) {
    return false;
  }
}

export default function ProtectedRoute() {
  const { userInfo } = userInfoStore();
  const token = userInfo?.login_token;
  const isAuthenticated = token && isTokenValid(token);

  return isAuthenticated ? (
    <Provider>
      <Outlet />
    </Provider>
  ) : (
    <Navigate to="/login" replace />
  );
}
