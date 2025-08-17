import { Box, Table } from '@mantine/core';
import { useTranslation } from 'react-i18next';

const items = [
  {
    rank: 'Four Card',
    single_pays: '4:1 (400%)',
    multiple_pays: '5:1 (500%)',
    super_niuniu_pays: '8:1 (800%)',
  },
  {
    rank: 'NIU NIU',
    single_pays: '3:1 (300%)',
    multiple_pays: '4:1 (400%)',
    super_niuniu_pays: '6:1 (600%)',
  },
  {
    rank: 'NIU 9',
    single_pays: '2:1 (200%)',
    multiple_pays: '3:1 (300%)',
    super_niuniu_pays: '5:1 (500%)',
  },
  {
    rank: 'NIU 8',
    single_pays: '2:1 (200%)',
    multiple_pays: '2:1 (200%)',
    super_niuniu_pays: '4:1 (400%)',
  },
  {
    rank: 'NIU 7',
    single_pays: '1:1 (100%)',
    multiple_pays: '2:1 (200%)',
    super_niuniu_pays: '3:1 (300%)',
  },
  {
    rank: 'NIU 5',
    single_pays: '1:1 (100%)',
    multiple_pays: '1:1 (100%)',
    super_niuniu_pays: '2:1 (200%)',
  },
  {
    rank: 'NIU 4',
    single_pays: '1:1 (100%)',
    multiple_pays: '1:1 (100%)',
    super_niuniu_pays: '2:1 (200%)',
  },
  {
    rank: 'NIU 3',
    single_pays: '1:1 (100%)',
    multiple_pays: '1:1 (100%)',
    super_niuniu_pays: '2:1 (200%)',
  },
  {
    rank: 'NIU 2',
    single_pays: '1:1 (100%)',
    multiple_pays: '1:1 (100%)',
    super_niuniu_pays: '2:1 (200%)',
  },
  {
    rank: 'NIU 1',
    single_pays: '1:1 (100%)',
    multiple_pays: '1:1 (100%)',
    super_niuniu_pays: '2:1 (200%)',
  },
  {
    rank: 'HIGH CARD',
    single_pays: '1:1 (100%)',
    multiple_pays: '1:1 (100%)',
    super_niuniu_pays: '1:1 (100%)',
  },
];

const header = ['Cards Rank', 'Single Pays', 'Multiple Pays', 'Super Niu Niu Pays'];

const Dividend = () => {
  const { t } = useTranslation();

  const rows = items.map((item, idx) => (
    <Table.Tr key={idx}>
      <Table.Td>{item.rank}</Table.Td>
      <Table.Td>{item.single_pays}</Table.Td>
      <Table.Td>{item.multiple_pays}</Table.Td>
      <Table.Td>{item.super_niuniu_pays}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Box pt="lg" mb="sm">
      <Table.ScrollContainer minWidth={500}>
        <Table withRowBorders={false} striped className="nowrap" ta="center">
          <Table.Thead pos="sticky" top={0}>
            <Table.Tr>
              {header.map((item, idx) => (
                <Table.Th ta="center" key={idx}>
                  {t(item)}
                </Table.Th>
              ))}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </Box>
  );
};

export default Dividend;
