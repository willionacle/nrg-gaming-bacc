'use client';
import { SFX } from '@/constants/sounds';
import { useSfxSound } from '@/hooks/useSfx';
import { useFullscreen } from '@mantine/hooks';
import { IconMaximize, IconMinimize } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import NiuBtn from './niu-btn';

const FullscreenBtn = () => {
  const { toggle, fullscreen } = useFullscreen();
  const { t } = useTranslation();
  const [playClick] = useSfxSound(SFX.click);

  return (
    <>
      <NiuBtn
        onClick={() => {
          toggle();
          playClick();
        }}
        tooltip={fullscreen ? t('minimize') : t('maximize')}
        circular
      >
        {fullscreen ? <IconMinimize /> : <IconMaximize />}
      </NiuBtn>
    </>
  );
};

export default FullscreenBtn;
