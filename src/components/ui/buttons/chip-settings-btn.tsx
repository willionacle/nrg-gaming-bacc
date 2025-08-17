import { SFX } from '@/constants/sounds';
import { useSfxSound } from '@/hooks/useSfx';
// import { placeBetStore } from '@/store/placeBetStore';
import { IconPokerChip } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import NiuBtn from './niu-btn';
import { modals } from '@mantine/modals';
import ModalContentWrapper2 from '@/providers/ModalContentWrapper2';
import { ChipSettingsModal } from '../modals';
// import tableInfoStore from '@/store/tableInfoStore';
import { ButtonProps } from '@mantine/core';
import { ReactNode } from 'react';

interface Props extends ButtonProps {
  circular?: boolean;
  children?: ReactNode;
}

const ChipSettingsBtn = ({ circular = true, children, ...props }: Props) => {
  // const { tableInfo } = tableInfoStore();
  const { t } = useTranslation();
  const [playClick] = useSfxSound(SFX.click);
  // const { isBetPlaced } = placeBetStore();

  const handleOpenChips = () => {
    playClick();
    modals.open({
      size: '70rem',
      keepMounted: true,
      children: (
        <ModalContentWrapper2 title={t('chip settings')}>
          <ChipSettingsModal />
        </ModalContentWrapper2>
      ),
    });
  };

  return (
    <NiuBtn
      onClick={handleOpenChips}
      circular={circular}
      // disabled={isBetPlaced(tableInfo?.tc_id as number)}
      btnSize="lg"
      tooltip={t('chip settings')}
      toolTipPos="top"
      {...props}
    >
      {circular ? <IconPokerChip stroke={2} /> : children}
    </NiuBtn>
  );
};

export default ChipSettingsBtn;
