'use client';

import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Box, PasswordInput, TextInput } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import userInfoStore from '@/store/userStore';
// import GameLoading from '../ui/loading/game-loading';
import { NiuBtn } from '../ui';
import logo from '@/assets/images/logo.png';

interface FormData {
  username: string;
  password: string;
  tableid: null | number;
  type: string;
  useragent: string;
}

export default function LoginForm() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const setUserInfo = userInfoStore((state) => state.setUserInfo);
  const clearUserInfo = userInfoStore((state) => state.clearUserInfo);
  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: '',
    tableid: null,
    type: 'user',
    useragent: typeof navigator !== 'undefined' ? navigator.userAgent : 'Browser',
  });
  const [loading, setLoading] = useState(false);
  const { userInfo } = userInfoStore();
  const isAuthenticated = !!userInfo?.login_token;
  const location = useLocation();
  const redirectTo = location.state?.from?.pathname || '/';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fetchUser = async (token: string) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/getuser`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok && data.code === 1) {
        navigate('/');
        console.log(data.data);
        setUserInfo(data.data);
        localStorage.setItem('justLoggedIn', 'true');
      } else {
        console.error('Failed:', data.message);
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loading) return;

    if (!formData.username || !formData.password) {
      toast.error('Missing required fields!');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.status === 200) {
        fetchUser(data.data.token);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Login failed!');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    clearUserInfo();
  }, []);

  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  // if (loading) return <GameLoading />;

  return (
    <div className="player-login-wrapper">
      <div className="logo-wrapper">
        <img src={logo} />
      </div>
      <h3 className="title text-gold-gradient">{t('Welcome to NRG')}</h3>
      <form onSubmit={handleSubmit}>
        <TextInput withAsterisk name="username" onChange={handleChange} mb="md" label="Username" />
        <PasswordInput
          withAsterisk
          name="password"
          onChange={handleChange}
          mb="md"
          label="Password"
        />
        <Box mt="xl" className="button-wrapper">
          <NiuBtn radius="xs" type="submit" loading={loading} hasSides>
            {t('login')}
          </NiuBtn>
        </Box>
      </form>
    </div>
  );
}
