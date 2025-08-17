import React, { useEffect, useState } from 'react';
import { TableTimer } from '@/components';
import BettingControls from './betting-controls';
import { useSfxSound } from '@/hooks/useSfx';
import { SFX } from '@/constants/sounds';
import BettingAreaWrapper from '@/providers/BettingAreaWrapper';
import { useUpdateTableRoomSocket } from '@/hooks/useUpdateTableRoomSocket';
import useReceivedCardsSocket from '@/hooks/useReceivedCardsSocket';
import { TABLE_STATUS } from '@/constants/tableStatus';
import { BaccaratResult } from '@/types';
import userInfoStore from '@/store/userStore';
import { toast } from 'sonner';
import { placeBetStore } from '@/store/placeBetStore';
import { useTableBets } from '@/hooks/useTableBets';
import { useUserInteractionStore } from '@/store/userInteractionStore';
import { useParams } from 'react-router-dom';
import BettingBox from './betting-box';
import betsStore from '@/store/betsStore';
import tableInfoStore from '@/store/tableInfoStore';
interface ChipProps {
  chip: string;
  xEnd: number;
  yEnd: number;
  xStart: number;
  yStart: number;
  amount: number;
  area: string;
}

interface BoundingRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface AreaPositions {
  [key: string]: BoundingRect | null;
}

interface Props {
  setSelectedChips: React.Dispatch<React.SetStateAction<ChipProps[]>>;
  result: BaccaratResult | null;
  isChipAnimating: boolean;
  setIsChipAnimating: React.Dispatch<React.SetStateAction<boolean>>;
  refetchBoardResults: () => void;
}

const BettingArea = ({
  setSelectedChips,
  result,
  isChipAnimating,
  setIsChipAnimating,
  refetchBoardResults,
}: Props) => {
  const table = tableInfoStore((state) => state.tableInfo);
  const { id } = useParams();
  const tableId = Number(id);
  const { bets } = useTableBets(tableId);
  const { isBetPlaced } = placeBetStore();
  const userInfo = userInfoStore((state) => state.userInfo);
  const { updatedRoom } = useUpdateTableRoomSocket();
  const { cardResults, setCardResults } = useReceivedCardsSocket(table?.cards);
  const isBettingAreaOpenOnLoad = useUserInteractionStore((state) => state.isBettingAreaOpenOnLoad);
  const clearBets = betsStore((state) => state.clearBets);

  const [selectedChip, setSelectedChip] = useState({
    amount: 0,
    chip: '',
    x: 0,
    y: 0,
  });

  const [clickPlay] = useSfxSound(SFX.click);
  const isPlayerWin = result?.winner == 'PLAYER';
  const isBankerWin = result?.winner == 'BANKER';
  const isTieWin = result?.winner == 'TIE';

  const [areaPositions, setAreaPositions] = useState<AreaPositions>({
    PPAIR: null,
    TIE: null,
    BPAIR: null,
    PLAYER: null,
    BANKER: null,
  });

  const setPosition =
    (area: keyof AreaPositions) =>
    (pos: { x: number; y: number; width: number; height: number }) => {
      setAreaPositions((prev) => ({ ...prev, [area]: pos }));
    };

  const getTotalAmountByArea = (area: string): number => {
    return bets.filter((chip) => chip.area === area).reduce((sum, chip) => sum + chip.amount, 0);
  };

  const handleShowChip = (data: string) => {
    return bets.some((item) => item.area === data);
  };

  const getLatestChipByArea = (area: string): ChipProps | undefined => {
    // @ts-ignore
    return bets.findLast((chip) => chip.area === area);
  };

  const handleClick = (area: keyof AreaPositions) => {
    clickPlay();

    if (isBetPlaced(tableId)) return;

    const areaPosition = areaPositions[area];
    const totalBet = bets.reduce((sum, chip) => sum + chip.amount, 0);
    const userBalance = userInfo?.tu_balance ?? 0;

    if (!isChipAnimating) {
      if (userBalance >= totalBet + selectedChip.amount) {
        if (area && selectedChip.chip) {
          const newChip: ChipProps = {
            chip: selectedChip.chip,
            xEnd: areaPosition?.x as number,
            yEnd: (areaPosition?.y as number) - (isBettingAreaOpenOnLoad ? 0 : 70),
            xStart: selectedChip.x,
            yStart: selectedChip.y,
            amount: selectedChip.amount,
            area: area as string,
          };
          setSelectedChips((prev) => [...prev, newChip]);
        }
      } else {
        toast.warning('Your Balance is not enough');
      }
    }

    setIsChipAnimating(true);
  };

  useEffect(() => {
    if (updatedRoom?.tableID == tableId) {
      if (
        updatedRoom?.status == TABLE_STATUS.nextRound ||
        updatedRoom?.status == TABLE_STATUS.dealingCard ||
        updatedRoom?.status == TABLE_STATUS.openTable ||
        updatedRoom?.status == TABLE_STATUS.startGame
      ) {
        setCardResults(null);
        refetchBoardResults();
      }
    }
  }, [updatedRoom, tableId]);

  useEffect(() => {
    setCardResults(null);
  }, [tableId]);

  const bettingAreas = [
    {
      key: 'PPAIR',
      shortenKey: 'pp',
      winCheck: isPlayerWin,
    },
    {
      key: 'TIE',
      shortenKey: 't',
      winCheck: isTieWin,
      extra: (
        <TableTimer
          setTime={(data: number) => {
            // remove bets if not placed
            if (data == 0 && !isBetPlaced(tableId))
              clearBets(tableId), setSelectedChips([]), setIsChipAnimating(false);
          }}
        />
      ),
    },
    {
      key: 'BPAIR',
      shortenKey: 'bp',
      winCheck: isBankerWin,
    },
    {
      key: 'PLAYER',
      shortenKey: 'p',
      winCheck: isPlayerWin,
      cardResults: {
        score: cardResults?.playerScore ?? 0,
        cards: cardResults?.player ?? [],
        pos: 'left' as const,
      },
      statsProps: { w: 'calc(100% - 33%)' },
    },
    {
      key: 'BANKER',
      shortenKey: 'b',
      winCheck: isBankerWin,
      cardResults: {
        score: cardResults?.bankerScore ?? 0,
        cards: cardResults?.banker ?? [],
        pos: 'right' as const,
      },
      statsProps: { w: 'calc(100% - 33%)', ml: 'auto' },
    },
  ];

  return (
    <BettingAreaWrapper
      showControls={updatedRoom?.tableID == tableId ? Number(updatedRoom?.status) : undefined}
    >
      {bettingAreas.map((item) => (
        <BettingBox
          key={item.key}
          keyName={item.key}
          shortenKey={item.shortenKey}
          isWin={item.winCheck}
          isDisabled={isBetPlaced(tableId) || !selectedChip.chip}
          onClick={() => handleClick(item.key)}
          totalAmount={getTotalAmountByArea(item.key)}
          chip={getLatestChipByArea(item.key)?.chip ?? ''}
          onPositionChange={setPosition(item.key)}
          opacity={handleShowChip(item.key) ? 1 : 0}
          cardResults={item.cardResults}
          extraComponent={item.extra}
        />
      ))}
      <BettingControls
        onRepeatBet={setSelectedChips}
        clearBets={setSelectedChips}
        onClick={setSelectedChip}
        tableId={tableId}
      />
    </BettingAreaWrapper>
  );
};

export default BettingArea;
