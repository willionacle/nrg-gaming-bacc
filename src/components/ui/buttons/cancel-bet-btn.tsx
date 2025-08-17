import { SFX } from '@/constants/sounds';
import useRefetchUser from '@/hooks/useRefetchUser';
import { useSfxSound } from '@/hooks/useSfx';
import { useSubmitRequest } from '@/hooks/useSubmitRequest';
import { useTableBets } from '@/hooks/useTableBets';
import betsStore from '@/store/betsStore';
import { placeBetStore } from '@/store/placeBetStore';
import tableInfoStore from '@/store/tableInfoStore';
// import { ActionIcon, Tooltip } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
// import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import NiuBtn from './niu-btn';

interface Props {
  onCancelBets?: () => void;
  tableId: number;
}
const cancelBetBtn = ({ onCancelBets, tableId }: Props) => {
  const { t } = useTranslation();
  const [playClick] = useSfxSound(SFX.click);
  const clearBets = betsStore((state) => state.clearBets);
  const table = tableInfoStore((state) => state.tableInfo);
  const { sendRequest } = useSubmitRequest();
  const { fetchUser } = useRefetchUser();
  const { resetBet, isBetPlaced } = placeBetStore();
  const { bets } = useTableBets(tableId);

  const handleCancelBet = async () => {
    playClick();
    resetBet(tableId);
    clearBets(tableId);
    await sendRequest({
      url: 'cancelbet',
      method: 'POST',
      body: {
        tc_id: table?.id,
      },
    });
    fetchUser();
    onCancelBets && onCancelBets();
  };

  return (
    // <Tooltip label={t('cancel bet')}>
    //   <ActionIcon
    //     onClick={handleCancelBet}
    //     disabled={!isBetPlaced(tableId) && bets.length == 0}
    //     variant="light"
    //     className={clsx(
    //       'cancel-bet',
    //       !isBetPlaced(tableId) && bets.length == 0 && 'disabaled-bet-btn'
    //     )}
    //     size="xl"
    //   >
    //     <IconTrash color="red" stroke={2} />
    //   </ActionIcon>
    // </Tooltip>
    <NiuBtn
      onClick={handleCancelBet}
      circular
      disabled={!isBetPlaced(tableId) && bets.length == 0}
      btnSize="lg"
      tooltip={t('cancel bet')}
      toolTipPos="top"
    >
      <IconTrash color="red" stroke={2} />
    </NiuBtn>
  );
};

export default cancelBetBtn;
