'use client';
import { ChangeTableBtn, ChipSettingsBtn } from '@/components/ui';
import DynamicGrid from '@/components/ui/dynamic-grid';
import { useTableBets } from '@/hooks/useTableBets';
import tableInfoStore from '@/store/tableInfoStore';
import { ScoreboardData, ScoreboardData2 } from '@/types';
import { Box, Group, NumberFormatter, Text } from '@mantine/core';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
interface Props {
  resultData: ScoreboardData | ScoreboardData2 | undefined;
}

const BettingLeftBoard = ({ resultData }: Props) => {
  const tableInfo = tableInfoStore((state) => state.tableInfo);

  const { totalBet } = useTableBets(Number(tableInfo?.id));
  const { t } = useTranslation();

  return (
    <Box className={clsx('result-board-left', 'result-board-left-niu')}>
      <Group
        justify="space-between"
        wrap="nowrap"
        align="center"
        className="result-board-top top-line"
        px="xs"
        gap={10}
      >
        <Group wrap="nowrap" gap={5} className="board-left-btns">
          <ChangeTableBtn />
          <ChipSettingsBtn radius="xs" size="xs" children={t('chip settings')} circular={false} />
        </Group>
        <Group justify="space-around" wrap="nowrap" align="flex-start">
          {/* <Group
            align="items-center"
            justify="space-around"
            className="left-details desktop"
            gap={5}
          >
            <Text className="">{t('game')} Name:</Text>
            <Text>{tableInfo?.tc_id}</Text>
            
          </Group> */}
          <Group align="items-center" className="left-details" gap={5}>
            <Text className=" nowrap">{t('total bet')}:</Text>
            <Text className="text-yellow">
              <NumberFormatter value={totalBet} />
            </Text>
          </Group>
          <Group align="items-center" justify="space-around" className="left-details" gap={5}>
            <Text className=" nowrap">{t('Round No.')}:</Text>
            <Text className="nowrap text-yellow">{resultData?.round_number ?? 0}</Text>
          </Group>
        </Group>
      </Group>
      {/* <Group
        justify="space-around"
        wrap="nowrap"
        align="center"
        w="100%"
        className="result-board-top top-line"
      >
        <Group align="items-center" justify="space-around" className="left-details" gap={5}>
          <Text className="">{t('game')} ID:</Text>
          <Text>{tableInfo?.tc_id}</Text>
        </Group>
        <Group align="items-center" className="left-details" gap={5}>
          <Text className="">{t('total bet')}:</Text>
          <Text>
            <NumberFormatter value={totalAmount} />
          </Text>
        </Group>
      </Group> */}
      <Box className="result-board watermark">
        <DynamicGrid results={resultData?.beadPlate} board="BEAD" adjuster={2} />
      </Box>
    </Box>
  );
};

export default BettingLeftBoard;
