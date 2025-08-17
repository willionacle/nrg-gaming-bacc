'use client';
import { BackgroundMusicPlayer } from '@/components';
import GameLoading from '@/components/ui/loading/game-loading';
import { useUserInteractionStore } from '@/store/userInteractionStore';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
const MainWrapper = ({ children }: { children: React.ReactNode }) => {
  const [isLandscape, setIsLandscape] = useState(false);
  const { pathname } = useLocation();
  const isIngame = pathname.includes('table');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const adjustScale = () => {
      setIsLoading(true);
      const isLandscape = window.innerWidth > window.innerHeight;
      setIsLandscape(isLandscape);

      const element = document.body;

      if (!isLandscape) {
        element.removeAttribute('style');
        element.classList.add('body-mobile'); // ✅ add class
        setIsLoading(false);
        return;
      }

      // Remove class if previously added
      element.classList.remove('body-mobile');

      const minWidth = 1920;
      const minHeight = 1080;
      const scaleX = window.innerWidth / minWidth;
      const scaleY = window.innerHeight / minHeight;
      const scale = Math.min(scaleX, scaleY, 1);

      Object.assign(element.style, {
        transform: `translate(-50%, -50%) scale(${scale})`,
        position: 'absolute',
        left: '50%',
        top: '50%',
        minWidth: `${minWidth}px`,
        minHeight: `${minHeight}px`,
        maxWidth: '1080px',
        maxHeight: '100%',
        margin: '0',
        padding: '0',
        zoom: '1',
        overflow: 'hidden',
      });

      setTimeout(() => setIsLoading(false), 500);
    };

    const handleUserInteraction = () => {
      useUserInteractionStore.getState().setInteracted();
      window.removeEventListener('click', handleUserInteraction);
    };

    window.addEventListener('resize', adjustScale);
    window.addEventListener('click', handleUserInteraction);
    adjustScale();

    return () => {
      window.removeEventListener('resize', adjustScale);
      window.removeEventListener('click', handleUserInteraction);
    };
  }, []);

  return (
    <>
      <BackgroundMusicPlayer />
      <main
        lang="en"
        className={clsx(isLandscape ? '' : 'mobile-device', isIngame && 'main-table')}
      >
        {isLoading ? <GameLoading /> : children}
      </main>
    </>
  );
};

export default MainWrapper;
