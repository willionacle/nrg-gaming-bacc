import betsStore from '@/store/betsStore';
import useRefetchUser from '@/hooks/useRefetchUser';
import { placeBetStore } from '@/store/placeBetStore';
import tableInfoStore from '@/store/tableInfoStore';
import { useSfxSound } from '@/hooks/useSfx';
import { SFX } from '@/constants/sounds';
import { Box, Button } from '@mantine/core';
import clsx from 'clsx';
import { useTableBets } from '@/hooks/useTableBets';
import { useSubmitRequest } from '@/hooks/useSubmitRequest';

const NiuClearBetBtn = ({
  onClear,
  disabled = false,
}: {
  onClear?: () => void;
  disabled?: boolean;
}) => {
  const { tableInfo } = tableInfoStore();
  const tableId = tableInfo?.id as number;
  const { clearBets, setSelectedBetOption } = betsStore();
  const { resetBet, isBetPlaced } = placeBetStore();
  const { fetchUser } = useRefetchUser();
  const [playClick] = useSfxSound(SFX.click);
  const { bets } = useTableBets(tableId);
  const { sendRequest } = useSubmitRequest();

  const handleCancelBet = async () => {
    onClear && onClear();
    playClick();
    setSelectedBetOption(tableId, '');
    resetBet(tableId);
    clearBets(tableId);
    await sendRequest({
      url: 'cancelbet',
      method: 'POST',
      body: {
        tc_id: tableId,
      },
    });
    fetchUser();
  };

  return (
    <Box className="niu-clear-btn-wrapper">
      <Button
        className={clsx(
          'niu-clear-btn',
          ((!isBetPlaced(tableId) && bets.length == 0) || disabled) && 'disabled-color'
        )}
        disabled={(!isBetPlaced(tableId) && bets.length == 0) || disabled}
        onClick={handleCancelBet}
        fz="md"
        radius="xs"
      />
    </Box>
  );
};

export default NiuClearBetBtn;
