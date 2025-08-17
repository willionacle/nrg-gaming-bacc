import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type SoundStore = {
  globalVolume: number;
  musicVolume: number;
  sfxVolume: number;
  isMuted: boolean;
  isMusicMuted: boolean;
  isSfxMuted: boolean;
  toggleMusicMute: () => void;
  toggleMute: () => void;
  toggleSfxMute: () => void;
  setGlobalVolume: (v: number) => void;
  setMusicVolume: (v: number) => void;
  setSfxVolume: (v: number) => void;
};

export const useSoundStore = create<SoundStore>()(
  persist(
    (set) => ({
      globalVolume: 1,
      musicVolume: 1,
      sfxVolume: 1,
      isMuted:false,
      isMusicMuted: false,
      isSfxMuted: false,
      toggleMute: () =>
        set((s) => ({ isMuted: !s.isMuted })),
      toggleMusicMute: () =>
        set((s) => ({ isMusicMuted: !s.isMusicMuted })),
      toggleSfxMute: () =>
        set((s) => ({ isSfxMuted: !s.isSfxMuted })),
      setGlobalVolume: (v) => set({ globalVolume: v }),
      setMusicVolume: (v) => set({ musicVolume: v }),
      setSfxVolume: (v) => set({ sfxVolume: v }),
    }),
    {
      name: 'sound-settings',
    }
  )
);
