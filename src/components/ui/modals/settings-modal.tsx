'use client';

import { Stack } from '@mantine/core';
import { LangSelect, RoadThemeControl } from '@/components';
import { CustomSlider } from '@/components';
import { useTranslation } from 'react-i18next';
import { useSoundStore } from '@/store/soundStore';

const SettingsModal = () => {
  const { t } = useTranslation();

  const {
    globalVolume,
    musicVolume,
    sfxVolume,
    isMuted,
    isMusicMuted,
    isSfxMuted,
    setGlobalVolume,
    setMusicVolume,
    setSfxVolume,
    toggleMute,
    toggleMusicMute,
    toggleSfxMute,
  } = useSoundStore();

  return (
    <Stack mb="sm" gap="lg" mih={200}>
      <RoadThemeControl />
      <LangSelect label={t('language')} />
      <CustomSlider
        isMuted={isMuted}
        onChangeIcon={toggleMute}
        label={t('volume')}
        value={globalVolume}
        onChange={setGlobalVolume}
        min={0}
        max={1}
        step={0.01}
      />
      <CustomSlider
        isMuted={isMusicMuted}
        onChangeIcon={toggleMusicMute}
        label={t('music')}
        value={musicVolume}
        onChange={setMusicVolume}
        min={0}
        max={1}
        step={0.01}
      />
      <CustomSlider
        isMuted={isSfxMuted}
        onChangeIcon={toggleSfxMute}
        label="SFX"
        value={sfxVolume}
        onChange={setSfxVolume}
        min={0}
        max={1}
        step={0.01}
      />
    </Stack>
  );
};

export default SettingsModal;
