import { useFetch } from '@/hooks/useFetch';
import userInfoStore from '@/store/userStore';
import { ServerAPIResponse } from '@/types';
import { Box, NumberFormatter, Table } from '@mantine/core';
import { useLocation, useParams } from 'react-router-dom';
import resultGirl from '@/assets/images/result-girl.png';

type DataKey = 'betwin' | 'extra' | 'total';

interface ResultData {
  status: string;
  data: Record<DataKey, number>;
}

const NiuWinnerPop = () => {
  const { id } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const round = searchParams.get('round');

  const userInfo = userInfoStore((state) => state.userInfo);
  const { data } = useFetch<ServerAPIResponse<Record<string, ResultData>>>(
    `resultniu?tc_id=${id}&tu_userid=${userInfo?.id}&tbh_round_id=${round}`
  );

  if (!data) return;

  const entries = Object.entries(data?.data as Record<string, ResultData>);

  const getStatusClass = (status: string) =>
    status === 'Win' ? 'text-purple' : status.includes('Tie') ? 'text-green' : 'text-red';

  return (
    <Box className="niu-result-popup">
      <img src={resultGirl} className="result-girl" />
      <Table.ScrollContainer minWidth={300}>
        <Table withColumnBorders withRowBorders={false} striped>
          <Table.Thead>
            <Table.Tr>
              <Table.Th />
              {entries.map(([key, value]) => (
                <Table.Th key={key} className={getStatusClass(value.status)}>
                  {key} {value.status}
                </Table.Th>
              ))}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {['betwin', 'extra', 'total'].map((label) => (
              <Table.Tr key={label}>
                <Table.Td className="text-yellow">{label}</Table.Td>
                {entries.map(([key, value]) => (
                  <Table.Td key={`${label}-${key}`} className="text-yellow">
                    <NumberFormatter value={value.data[label as DataKey]} />
                  </Table.Td>
                ))}
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </Box>
  );
};

export default NiuWinnerPop;
