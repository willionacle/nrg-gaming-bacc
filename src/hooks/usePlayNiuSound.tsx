import { useEffect } from 'react';
import { useSfxSound } from './useSfx';
import { SFX } from '@/constants/sounds';
import { useUserInteractionStore } from '@/store/userInteractionStore';

export const usePlayNiuSound = (idx: number, label: string, option: string) => {
  const { isInteracted } = useUserInteractionStore();

  const [playNoBull, { sound: soundNoBull }] = useSfxSound(SFX.noBull);
  const [playBull1, { sound: soundBull1 }] = useSfxSound(SFX.niu1);
  const [playBull2, { sound: soundBull2 }] = useSfxSound(SFX.niu2);
  const [playBull3, { sound: soundBull3 }] = useSfxSound(SFX.niu3);
  const [playBull4, { sound: soundBull4 }] = useSfxSound(SFX.niu4);
  const [playBull5, { sound: soundBull5 }] = useSfxSound(SFX.niu5);
  const [playBull6, { sound: soundBull6 }] = useSfxSound(SFX.niu6);
  const [playBull7, { sound: soundBull7 }] = useSfxSound(SFX.niu7);
  const [playBull8, { sound: soundBull8 }] = useSfxSound(SFX.niu8);
  const [playBull9, { sound: soundBull9 }] = useSfxSound(SFX.niu9);
  const [playHighCard, { sound: soundHighCard }] = useSfxSound(SFX.highCard);
  const [playNiuNiu, { sound: soundNiuNiu }] = useSfxSound(SFX.niuNiu);

  const [playBanker, { sound: soundBanker }] = useSfxSound(SFX.banker);
  const [playPlayer1, { sound: soundPlayer1 }] = useSfxSound(SFX.player1);
  const [playPlayer2, { sound: soundPlayer2 }] = useSfxSound(SFX.player2);
  const [playPlayer3, { sound: soundPlayer3 }] = useSfxSound(SFX.player3);

  const soundMap: Record<string, { play: () => void; sound?: any }> = {
    'NO NIU': { play: playNoBull, sound: soundNoBull },
    'NIU 1': { play: playBull1, sound: soundBull1 },
    'NIU 2': { play: playBull2, sound: soundBull2 },
    'NIU 3': { play: playBull3, sound: soundBull3 },
    'NIU 4': { play: playBull4, sound: soundBull4 },
    'NIU 5': { play: playBull5, sound: soundBull5 },
    'NIU 6': { play: playBull6, sound: soundBull6 },
    'NIU 7': { play: playBull7, sound: soundBull7 },
    'NIU 8': { play: playBull8, sound: soundBull8 },
    'NIU 9': { play: playBull9, sound: soundBull9 },
    'HIGH CARD': { play: playHighCard, sound: soundHighCard },
    'NIU NIU': { play: playNiuNiu, sound: soundNiuNiu },
  };

  const soundOptionsMap: Record<string, { play: () => void; sound?: any }> = {
    banker: { play: playBanker, sound: soundBanker },
    player: { play: playPlayer1, sound: soundPlayer1 },
    player_2: { play: playPlayer2, sound: soundPlayer2 },
    player_3: { play: playPlayer3, sound: soundPlayer3 },
  };

  useEffect(() => {
    console.log(label, 'label here');
    if (idx === 4 && label && option && isInteracted) {
      const intro = soundOptionsMap[option];
      const result = soundMap[label];

      if (intro?.sound && !intro.sound.playing()) {
        intro.play();
      }

      const timeout = setTimeout(() => {
        if (result?.sound && !result.sound.playing()) {
          result.play();
        }
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [idx, label, option]);
};
