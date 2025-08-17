import useSound from 'use-sound';
import { useSoundStore } from '@/store/soundStore';

type UseSoundOptions = Parameters<typeof useSound>[1];

export function useBgm(
  src: string,
  options?: UseSoundOptions & { loop?: boolean }
) {
  const { musicVolume, globalVolume, isMusicMuted, isMuted } = useSoundStore();

  const effectiveVolume =
    isMusicMuted || isMuted ? 0 : musicVolume * globalVolume;

  const [play, data] = useSound(src, {
    volume: effectiveVolume,
    ...options,
  });

  if (options?.loop && data.sound) {
    data.sound.loop(true);
  }

  return [play, data] as const;
}
