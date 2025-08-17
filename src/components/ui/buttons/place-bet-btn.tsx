import { SFX } from '@/constants/sounds';
import useRefetchUser from '@/hooks/useRefetchUser';

import { useSfxSound } from '@/hooks/useSfx';
import { useSubmitRequest } from '@/hooks/useSubmitRequest';
import { useTableBets } from '@/hooks/useTableBets';
import ModalContentWrapper2 from '@/providers/ModalContentWrapper2';
import { placeBetStore } from '@/store/placeBetStore';
import { Box } from '@mantine/core';
import { modals } from '@mantine/modals';
import { IconCheck } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import NiuBtn from './niu-btn';
import betsStore from '@/store/betsStore';
// import { toast } from 'sonner';

const PlaceBetBtn = ({ tableId }: { tableId: number }) => {
  const { t } = useTranslation();
  const [playClick] = useSfxSound(SFX.click);
  const { bets } = useTableBets(tableId);
  const { placeBet, isBetPlaced } = placeBetStore();
  const { setPreviousBets } = betsStore();
  const { sendRequest } = useSubmitRequest();
  const { fetchUser } = useRefetchUser();
  const disabled = isBetPlaced(tableId) || bets.length == 0;
  const handlePairFormat = (data: string) => {
    if (data == 'PPAIR') return 'PLAYER PAIR';
    if (data == 'BPAIR') return 'BANKER PAIR';

    return data;
  };

  const handlePlaceBet = async () => {
    const bet_data = Object.values(
      bets?.reduce(
        (acc, item) => {
          if (!acc[item.area]) {
            acc[item.area] = {
              tbbh_bet_option: handlePairFormat(item?.area),
              tbbh_bet_amount: item.amount,
            };
          } else {
            acc[item.area].tbbh_bet_amount += item.amount;
          }
          return acc;
        },
        {} as Record<string, { tbbh_bet_option: string; tbbh_bet_amount: number }>
      )
    );

    playClick();

    const payload = {
      tc_id: tableId,
      bet_data,
    };

    const res = await sendRequest({
      url: 'bet',
      method: 'POST',
      body: payload,
    });

    if ((res as any)?.code == 1) {
      placeBet(tableId);
      setPreviousBets(tableId, bets);
      handleOpenMsg('Bet successfully placed');
      fetchUser();
    } else {
      handleOpenMsg((res as any).message);
    }
  };

  const handleOpenMsg = (msg: string) => {
    modals.open({
      size: 'md',
      overlayProps: {
        backgroundOpacity: 0,
      },
      children: (
        <ModalContentWrapper2 hasBtns={false} autoClose>
          <Box fw="600" fz={25} p="md" ta="center">
            {t(msg)}
          </Box>
        </ModalContentWrapper2>
      ),
    });
  };

  return (
    // <Tooltip label={t('confirm bet')} disabled={disabled}>
    //   <ActionIcon
    //     onClick={handlePlaceBet}
    //     disabled={disabled}
    //     variant="light"
    //     className={clsx('confirm-bet', disabled && 'disabaled-bet-btn')}
    //     color="green"
    //     size="xl"
    //   >
    //     <IconCheck color="green" stroke={3} />
    //   </ActionIcon>
    // </Tooltip>
    <NiuBtn
      onClick={handlePlaceBet}
      circular
      btnSize="lg"
      tooltip={t('confirm bet')}
      disabled={disabled}
      toolTipPos="top"
    >
      <IconCheck color="green" stroke={3} />
    </NiuBtn>
  );
};

export default PlaceBetBtn;
