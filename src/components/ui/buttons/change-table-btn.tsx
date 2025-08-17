// import { ActionIcon, Tooltip } from '@mantine/core';
import { modals } from '@mantine/modals';
import { IconArrowsExchange } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import ChangeTableModal from '../modals/change-table-modal';
import { useSfxSound } from '@/hooks/useSfx';
import { SFX } from '@/constants/sounds';
import ModalContentWrapper2 from '@/providers/ModalContentWrapper2';
import NiuBtn from './niu-btn';

const ChangeTableBtn = ({ isMobile }: { isMobile?: boolean }) => {
  const { t } = useTranslation();
  const [playClick] = useSfxSound(SFX.click);

  const handleOpenSettings = () => {
    modals.open({
      size: '70rem',
      children: (
        <ModalContentWrapper2 title={'change table'}>
          <ChangeTableModal />
        </ModalContentWrapper2>
      ),
    });
  };

  return isMobile ? (
    <NiuBtn
      onClick={() => {
        handleOpenSettings(), playClick();
      }}
      tooltip="change table"
      circular
    >
      <IconArrowsExchange />
    </NiuBtn>
  ) : (
    <NiuBtn
      onClick={() => {
        handleOpenSettings(), playClick();
      }}
      radius="xs"
      size="xs"
      tooltip="change table"
    >
      {t('change table')}
    </NiuBtn>
  );
};

export default ChangeTableBtn;
