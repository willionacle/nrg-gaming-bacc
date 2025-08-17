import { Box, Group, Stack } from '@mantine/core';
import UserInfo from './user-info';
import NiuChips from './niu-chips';
import MoneyContainerLabel from './money-container-label';
import NiuClearBetBtn from '@/components/ui/buttons/niu-clear-bet-btn';
import { useTableBets } from '@/hooks/useTableBets';
import { NiuPlaceBetBtn } from '@/components/ui';
import tableInfoStore from '@/store/tableInfoStore';
import BottomMsg from './bottom-msg';
import userInfoStore from '@/store/userStore';
import { TABLE_STATUS } from '@/constants/tableStatus';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  onChipClick: (data: { amount: number; chip: string; x: number; y: number }) => void;
  onBet?: (data?: any) => void;
  tableStatus: number;
  setMsg: (data: string) => void;
  msg: string;
}

const NiuControls = ({ onChipClick, onBet, tableStatus, setMsg, msg }: Props) => {
  const { tableInfo } = tableInfoStore();
  const { afterPlaceBetBalance } = userInfoStore((state) => state);
  const { totalBet } = useTableBets(tableInfo?.id as number);
  const { t } = useTranslation();

  useEffect(() => {
    if (tableStatus == TABLE_STATUS.dealingCard) setMsg('Flipping Cards');
    if (tableStatus == TABLE_STATUS.finishGame) setMsg('Waiting for next round');
  }, [tableStatus]);

  return (
    <Group
      className="niu-bottom-wrapper"
      align="flex-end"
      justify="space-between"
      w="100%"
      p="md"
      py="lg"
    >
      <Stack align="center" className="niu-bottom-moneys" gap="xs">
        <UserInfo />
        <MoneyContainerLabel label={t('credit')} value={afterPlaceBetBalance as number} />
      </Stack>
      <Box className="niu-bottom-center">
        {tableStatus == TABLE_STATUS.nextRound && <NiuChips onClick={onChipClick} />}
        {tableStatus != TABLE_STATUS.nextRound && <BottomMsg label={msg} />}
        <NiuClearBetBtn disabled={tableStatus != 5} />
        <NiuPlaceBetBtn disabled={tableStatus != 5} onBet={onBet} />
      </Box>
      <Stack align="center" className="niu-bottom-moneys" gap="xs">
        <MoneyContainerLabel label={t('total bet')} value={totalBet} />
        {/* <MoneyContainerLabel label="total deposit" value={999999999} /> */}
      </Stack>
    </Group>
  );
};

export default NiuControls;
