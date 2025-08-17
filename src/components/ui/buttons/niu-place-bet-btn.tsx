import { SFX } from '@/constants/sounds';
import useRefetchUser from '@/hooks/useRefetchUser';

import { useSfxSound } from '@/hooks/useSfx';
import { useSubmitRequest } from '@/hooks/useSubmitRequest';
import { useTableBets } from '@/hooks/useTableBets';
import { placeBetStore } from '@/store/placeBetStore';
import tableInfoStore from '@/store/tableInfoStore';
import clsx from 'clsx';
// import { useTranslation } from 'react-i18next';
// import { toast } from 'sonner';
// import NiuBtn from './niu-btn';
import { Box, Button } from '@mantine/core';
import { modals } from '@mantine/modals';
import ModalContentWrapper2 from '@/providers/ModalContentWrapper2';
import { useTranslation } from 'react-i18next';

const NiuPlaceBetBtn = ({
  disabled = false,
  onBet,
}: {
  disabled?: boolean;
  onBet?: (data?: any) => void;
}) => {
  const { t } = useTranslation();
  const { tableInfo } = tableInfoStore();
  const tableId = tableInfo?.id as number;
  const [playClick] = useSfxSound(SFX.click);
  const { bets } = useTableBets(tableId);
  const { placeBet, isBetPlaced } = placeBetStore();
  const { sendRequest, error } = useSubmitRequest();
  const { fetchUser } = useRefetchUser();
  const betPlaced = isBetPlaced(tableId) || bets.length == 0;
  const handlePairFormat = (data: string) => {
    if (data == 'PPAIR') return 'PLAYER PAIR';
    if (data == 'BPAIR') return 'BANKER PAIR';

    return data;
  };

  const handlePlaceBet = async () => {
    const bet_data = Object.values(
      bets?.reduce(
        (acc, item) => {
          if (!acc[item?.area2 ?? '']) {
            acc[item?.area2 ?? ''] = {
              tbbh_bet_option: handlePairFormat(item?.area2 ?? ''),
              tbbh_bet_amount: item.amount,
            };
          } else {
            acc[item?.area2 ?? ''].tbbh_bet_amount += item.amount;
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

    await sendRequest({
      url: 'bet',
      method: 'POST',
      body: payload,
    });
    console.log(error);
    placeBet(tableId);
    onBet && onBet();
    // toast.success('Bet successfully placed!');
    handleOpenMsg();
    fetchUser();
  };

  const handleOpenMsg = () => {
    modals.open({
      size: 'md',
      overlayProps: {
        backgroundOpacity: 0,
      },
      children: (
        <ModalContentWrapper2 hasBtns={false} autoClose>
          <Box fw="600" fz={25} p="md" ta="center">
            {t('Bet successfully placed')}!
          </Box>
        </ModalContentWrapper2>
      ),
    });
  };

  return (
    <Box className="niu-place-btn-wrapper">
      <Button
        className={clsx('niu-placebet-btn', (betPlaced || disabled) && 'disabled-color')}
        fz="30px"
        radius="xs"
        onClick={handlePlaceBet}
        disabled={betPlaced || disabled}
      />
    </Box>
  );
};

export default NiuPlaceBetBtn;
