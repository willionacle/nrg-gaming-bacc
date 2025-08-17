import { useFetch } from '@/hooks/useFetch';
import userInfoStore from '@/store/userStore';
import { BetHistoryTypes, ServerAPIResponse, RoundDetails } from '@/types';
import {
  Box,
  Group,
  LoadingOverlay,
  NumberFormatter,
  Pagination,
  ScrollArea,
  Table,
  Text,
} from '@mantine/core';
import DateFormatter from '../date-formatter';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const tableHeaders = [
  'Bet ID',
  'Round ID',
  'Shoe ID',
  'Date & Time',
  'Type',
  'Bet Option',
  'Player Cards',
  'Banker Cards',
  'Player Score',
  'Banker Score',
  'Winner',
  'Bet Amount',
  'Win Amount',
  'Status',
];

interface CardImageGroupProps {
  cards: string[];
  type: 'player' | 'banker';
}

const CardImageGroup: React.FC<CardImageGroupProps> = ({ cards, type }) => {
  const cardNew = type === 'banker' ? cards : cards?.slice()?.reverse();

  return (
    <Group wrap="nowrap" justify={type === 'player' ? 'flex-end' : 'flex-start'} gap={4}>
      {cardNew.slice(0, 3).map((item, idx) => (
        <Box
          key={idx}
          w={30}
          className={
            cards.length >= 3 && idx == 2 && type == 'banker'
              ? `banker-landscape`
              : cards.length >= 3 && idx == 0 && type == 'player'
                ? 'player-landscape'
                : ''
          }
        >
          <img
            src={`/images/user-cards/${item.split('_').reverse().join('').toUpperCase()}.png`}
            alt={item}
          />
        </Box>
      ))}
    </Group>
  );
};

const BetHistory = () => {
  const { t } = useTranslation();
  const [activePage, setPage] = useState(1);
  const { userInfo } = userInfoStore();
  const params = new URLSearchParams({
    userid: String(userInfo?.id),
    page: String(activePage),
    limit: '10',
    sortby: 'desc',
    orderby: 'id',
    roundid: '',
  });

  const { data } = useFetch<ServerAPIResponse<BetHistoryTypes[]>>(
    `bethistory?${params.toString()}`
  );

  const rows =
    (data?.data?.length ?? 0) > 0 ? (
      data?.data?.map((item, idx) => {
        const roundDetails = JSON.parse(item?.tbh_round_details) as RoundDetails;

        return (
          <Table.Tr key={idx}>
            <Table.Td>{item.id}</Table.Td>
            <Table.Td>{item.tbh_round_id}</Table.Td>
            <Table.Td>{item.ts_id}</Table.Td>
            <Table.Td>
              <DateFormatter date={item.tbbh_reg_datetime} />
            </Table.Td>
            <Table.Td tt="capitalize">{item.tc_gameType}</Table.Td>
            <Table.Td tt="capitalize">
              {item?.tbbh_bet_option?.replaceAll('_', ' ').toLocaleLowerCase()}
            </Table.Td>
            <Table.Td tt="capitalize" ta="center">
              {item?.tbh_round_details ? (
                <CardImageGroup type="player" cards={roundDetails?.player_cards} />
              ) : (
                '-'
              )}
            </Table.Td>
            <Table.Td tt="capitalize" ta="center">
              {item?.tbh_round_details ? (
                <CardImageGroup type="banker" cards={roundDetails?.banker_cards} />
              ) : (
                '-'
              )}
            </Table.Td>
            <Table.Td tt="capitalize" ta="center">
              {roundDetails ? roundDetails.player_score : '-'}
            </Table.Td>
            <Table.Td tt="capitalize" ta="center">
              {roundDetails ? roundDetails.banker_score : '-'}
            </Table.Td>
            <Table.Td tt="capitalize" ta="center">
              {item?.tbh_round_details ? (
                <Group justify="center">
                  {roundDetails.winner === 'PLAYER' && <Box w={35} className="result blue" />}
                  {roundDetails.winner === 'BANKER' && <Box w={35} className="result red" />}
                  {roundDetails.winner === 'TIE' && <Box w={35} className="result green" />}
                </Group>
              ) : (
                '-'
              )}
            </Table.Td>
            <Table.Td ta="center">
              <NumberFormatter value={item.tbbh_bet_amount} />
            </Table.Td>
            <Table.Td ta="right">
              <NumberFormatter value={item.tbbh_win_amount} />
            </Table.Td>
            <Table.Td ta="right">
              <Text tt="capitalize" c={item.tbbh_bet_status === 'WIN' ? 'green' : 'red'}>
                {t(item.tbbh_bet_status)}
              </Text>
            </Table.Td>
          </Table.Tr>
        );
      })
    ) : (
      <Table.Tr>
        <Table.Td ta="center" colSpan={100}>
          {t('No records found')}
        </Table.Td>
      </Table.Tr>
    );

  return (
    <Box pt="lg" pos="relative">
      <LoadingOverlay
        visible={!data}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 2, color: '#0e0113' }}
        loaderProps={{ color: 'pink', type: 'bars' }}
      />
      <ScrollArea.Autosize mah="calc(100vh - 400px)" mb="md" scrollbars="y">
        <Table withRowBorders={false} striped className="nowrap">
          <Table.Thead pos="sticky" top={0}>
            <Table.Tr>
              {tableHeaders.map((header, idx) => (
                <Table.Th key={header} ta={idx === tableHeaders.length - 1 ? 'right' : 'left'}>
                  {t(header)}
                </Table.Th>
              ))}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </ScrollArea.Autosize>
      <Group justify="center" mb="md">
        <Pagination value={activePage} onChange={setPage} total={data?.totalpage ?? 0} />
      </Group>
    </Box>
  );
};

export default BetHistory;
