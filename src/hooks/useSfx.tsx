import useSound from "use-sound";
import { useSoundStore } from "@/store/soundStore";

export function useSfxSound(
  src: string,
  options?: Parameters<typeof useSound>[1]
) {
  const { sfxVolume, globalVolume, isSfxMuted, isMuted } = useSoundStore();

  const effectiveVolume = isSfxMuted || isMuted ? 0 : sfxVolume * globalVolume;

  return useSound(src, {
    volume: effectiveVolume,
    ...options,
  });
}
