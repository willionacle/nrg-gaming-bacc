import NiuBtn from './niu-btn';
import { IconHistory } from '@tabler/icons-react';
import { modals } from '@mantine/modals';
import ModalContentWrapper2 from '@/providers/ModalContentWrapper2';
import { BetHistory } from '../tables';
import { useTranslation } from 'react-i18next';
import { useSfxSound } from '@/hooks/useSfx';
import { SFX } from '@/constants/sounds';

const BetHistoryBtn = () => {
  const { t } = useTranslation();
  const [playClick] = useSfxSound(SFX.click);

  const handleOpenHistory = () => {
    playClick();
    modals.open({
      size: 'lg',
      children: (
        <ModalContentWrapper2 title={t('betting history')}>
          <BetHistory />
        </ModalContentWrapper2>
      ),
    });
  };

  return (
    <NiuBtn onClick={handleOpenHistory} tooltip={t('betting history')} circular>
      <IconHistory />
    </NiuBtn>
  );
};

export default BetHistoryBtn;
