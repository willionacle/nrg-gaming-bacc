import { Box, Group, NumberFormatter, Text } from '@mantine/core';
import {
  BoundingRect,
  ChipProps,
  NiuBettingProps,
  NiuSeatSummary,
  ServerAPIResponse,
  TableSeatMap,
} from '@/types';
import userInfoStore from '@/store/userStore';
import { useSfxSound } from '@/hooks/useSfx';
import { placeBetStore } from '@/store/placeBetStore';
import { useTableBets } from '@/hooks/useTableBets';
import { useMemo, useState } from 'react';
import { SFX } from '@/constants/sounds';
import { toast } from 'sonner';
import clsx from 'clsx';
import { IconUserCircle } from '@tabler/icons-react';
import { NiuBtn, StaticChip } from '@/components';
import betsStore from '@/store/betsStore';
import { useParams } from 'react-router-dom';
import { useFetch } from '@/hooks/useFetch';
import { TABLE_STATUS } from '@/constants/tableStatus';

const BettingSeatTop = ({
  setSelectedChips,
  isChipAnimating,
  setIsChipAnimating,
  selectedChip,
  tableStatus,
  myBetData,
  seatSummary,
}: NiuBettingProps) => {
  const seatArr = ['PLAYER_1', 'PLAYER_2', 'PLAYER_3'];
  const betOptions = ['EVEN', 'DOUBLE', 'NIU'];
  const { id } = useParams();
  const tableId = Number(id);
  const userInfo = userInfoStore((state) => state.userInfo);
  const [clickPlay] = useSfxSound(SFX.click);
  const { isBetPlaced } = placeBetStore();
  const { bets, totalBet } = useTableBets(tableId);
  const { getSelectedSeat, setSelectedSeat, setSelectedBetOption, getSelectedBetOption } =
    betsStore();
  const [positions, setPositions] = useState<Record<any, BoundingRect | null>>(() => {
    const initial = {} as Record<any, BoundingRect | null>;
    seatArr.forEach((item) => (initial[item as string] = null));
    return initial;
  });
  const { data: tableSeatData, refetch } = useFetch<ServerAPIResponse<TableSeatMap>>(
    `getseat?tableid=${tableId}&userid=${userInfo?.id}`
  );
  const [wiggle, setWiggle] = useState(false);

  const setters = useMemo(() => {
    return Object.fromEntries(
      seatArr.map((item) => [
        item,
        (rect: BoundingRect | null) =>
          setPositions((prev) => ({ ...prev, [item as string]: rect })),
      ])
    ) as Record<any, React.Dispatch<React.SetStateAction<BoundingRect | null>>>;
  }, [seatArr]);

  const getTotalAmountByArea = (area: string): number =>
    bets.filter((chip) => chip.area === area).reduce((sum, chip) => sum + chip.amount, 0);

  const getLatestChipByArea = (area: string): ChipProps | undefined =>
    [...bets].reverse().find((chip) => chip.area === area);

  const handlePlaceBets = () => {
    if (isBetPlaced(tableId) || tableStatus != TABLE_STATUS.nextRound) return;

    const areaPos = positions[getSelectedSeat(tableId) as string];
    const totalBet = bets.reduce((sum, chip) => sum + chip.amount, 0);
    const userBalance = userInfo?.tu_balance ?? 0;

    if (!isChipAnimating && areaPos && selectedChip?.chip) {
      if (userBalance >= totalBet + selectedChip?.amount) {
        const newChip: ChipProps = {
          chip: selectedChip?.chip,
          xEnd: areaPos.x,
          yEnd: areaPos.y,
          xStart: selectedChip?.x,
          yStart: selectedChip?.y,
          amount: selectedChip?.amount,
          area: `${getSelectedSeat(tableId)}` as string,
          area2: `${getSelectedSeat(tableId)}_${getSelectedBetOption(tableId)}` as string,
        };
        setSelectedChips((prev) => [...prev, newChip]);
        setIsChipAnimating(true);
      } else {
        toast.warning('Your Balance is not enough');
      }
    }
  };

  const handleJoinTableSeat = async (seatno: string) => {
    const payload = {
      userid: userInfo?.id,
      tableid: tableId,
      seatno: Number(seatno),
      name: userInfo?.username,
      avatar: '.',
    };

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/insertseat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo?.login_token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.status === 200) {
        refetch();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickSeat = (seat: string) => {
    clickPlay();
    handleJoinTableSeat(seat.replace('PLAYER_', ''));
    setSelectedSeat(tableId, seat), totalBet > 0 && handlePlaceBets();

    // condition to check if there is no selected bet option trigger the wiggle
    if ((selectedChip?.amount ?? 0) > 0 && !getSelectedBetOption(tableId)) {
      setWiggle(true);
      let timeout = setTimeout(() => {
        setWiggle(false);
        clearTimeout(timeout);
      }, 1000);
    }
  };

  return (
    <Box className="betting-board-niu">
      {seatArr.map((seat, idx) => (
        <Box w="100%" key={idx}>
          <Box
            w="100%"
            onClick={() => handleClickSeat(seat)}
            className={clsx(
              'niu-bet-option-btn',
              isBetPlaced(tableId) && 'pointer-none',
              Object.values(tableSeatData?.data ?? {}).some(
                (entry) => entry && entry?.userid === userInfo?.id
              ) &&
                tableSeatData?.data?.[String(idx + 1)]?.userid != userInfo?.id &&
                'disabled',
              tableSeatData?.data?.[String(idx + 1)]?.userid === userInfo?.id && 'active'
            )}
          >
            <Box className="niu-bet-option-winnings">
              <Box className="winnings-left">
                <NumberFormatter value={myBetData?.[String(idx + 1)]?.sum} />
              </Box>
              {/* <Box className="winnings-right">
                <NumberFormatter value={5000000} />
              </Box> */}
            </Box>
            <Text className="number" mt="lg">
              {idx + 1}
            </Text>
            <Box className="niu-bet-option-bottom">
              <Group align="center" gap="5">
                <IconUserCircle size={20} />
                <Text fw="bold">
                  {seatSummary?.[String(idx + 1) as keyof NiuSeatSummary]?.count ?? 0}
                </Text>
              </Group>
              <Text className="total-bet">
                <NumberFormatter
                  value={seatSummary?.[String(idx + 1) as keyof NiuSeatSummary]?.sum ?? 0}
                />
              </Text>
            </Box>
            <StaticChip
              amount={getTotalAmountByArea(seat as string)}
              onPositionChange={setters[seat as string]}
              opacity={bets.some((el) => el.area === (seat as string)) ? 1 : 0}
              chip={getLatestChipByArea(seat as string)?.chip ?? ''}
              niu
            />
          </Box>
          <NiuBtn
            radius="sm"
            onClick={() => {
              setSelectedBetOption(tableId, betOptions[idx]), seat && handlePlaceBets();
            }}
            w="100%"
            mt="xl"
            dark
            classProps={clsx(
              wiggle && 'wiggle-once',
              getSelectedBetOption(tableId) == betOptions[idx] && totalBet >= 0 && 'active'
            )}
            disabled={
              (totalBet > 0 && getSelectedBetOption(tableId) != betOptions[idx]) ||
              selectedChip?.amount == 0 ||
              tableStatus != TABLE_STATUS.nextRound
            }
          >
            {betOptions[idx]}
          </NiuBtn>
        </Box>
      ))}
    </Box>
  );
};

export default BettingSeatTop;
