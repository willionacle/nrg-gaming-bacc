import { SFX } from '@/constants/sounds';
import { useSfxSound } from '@/hooks/useSfx';
import betsStore from '@/store/betsStore';
import { placeBetStore } from '@/store/placeBetStore';
// import { ActionIcon, Tooltip } from '@mantine/core';
import { IconArrowBackUp } from '@tabler/icons-react';
// import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import NiuBtn from './niu-btn';

interface Props {
  tableId: number;
}

const RepeatBetBtn = ({ tableId }: Props) => {
  const { t } = useTranslation();
  const [playClick] = useSfxSound(SFX.click);

  const setBetsStore = betsStore((state) => state.setBetsStore);
  const getPreviousBetsByTableId = betsStore((state) => state.getPreviousBetsByTableId);
  const { isBetPlaced } = placeBetStore();

  const handleRepeatBet = () => {
    playClick();

    const previousBets = getPreviousBetsByTableId(tableId);
    console.log(previousBets);

    if (previousBets && previousBets.length > 0) {
      setBetsStore(tableId, previousBets);
    }
  };

  return (
    // <Tooltip label={t('repeat bet')}>
    //   <ActionIcon
    //     onClick={handleRepeatBet}
    //     variant="light"
    //     color="orange.6"
    //     disabled={isBetPlaced(tableId)}
    //     className={clsx('repeat-bet', isBetPlaced(tableId) && 'disabaled-bet-btn')}
    //     size="xl"
    //   >
    //     <IconArrowBackUp stroke={2} />
    //   </ActionIcon>
    // </Tooltip>
    <NiuBtn
      onClick={handleRepeatBet}
      circular
      disabled={isBetPlaced(tableId)}
      btnSize="lg"
      tooltip={t('repeat bet')}
      toolTipPos="top"
    >
      <IconArrowBackUp stroke={2} />
    </NiuBtn>
  );
};

export default RepeatBetBtn;
