'use client';

import { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useBgm } from '@/hooks/useBgm';
import { MUSIC } from '@/constants/sounds';

export default function BackgroundMusicPlayer() {
  const { pathname } = useLocation();

  if (pathname === '/login') {
    return null;
  }

  const [play, { sound: bgmSound, stop }] = useBgm(MUSIC.bgm, {
    loop: true,
  });

  const startMusic = useCallback(() => {
    if (bgmSound && !bgmSound.playing()) {
      play();
    }

    document.removeEventListener('click', startMusic);
    document.removeEventListener('keydown', startMusic);
    document.removeEventListener('touchstart', startMusic);
  }, [bgmSound, play]);

  useEffect(() => {
    document.addEventListener('click', startMusic);
    document.addEventListener('keydown', startMusic);
    document.addEventListener('touchstart', startMusic);

    return () => {
      stop?.();
      document.removeEventListener('click', startMusic);
      document.removeEventListener('keydown', startMusic);
      document.removeEventListener('touchstart', startMusic);
    };
  }, [startMusic, stop]);

  return null;
}
