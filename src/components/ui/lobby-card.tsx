import { useEffect, useState } from 'react';
import DynamicGrid from './dynamic-grid';
import { IconUser } from '@tabler/icons-react';
import { Box, Divider, Group, NumberFormatter } from '@mantine/core';
import BoardResultOverlay from './board-result-overlay';
import { useTranslation } from 'react-i18next';
import { useSfxSound } from '@/hooks/useSfx';
import { SFX } from '@/constants/sounds';
import { ScoreboardData, ScoreboardData2, ServerAPIResponse, TableData } from '@/types';
import Timer from './timer';
// import { socketEvents } from '@/constants/socketEvents';
import { TABLE_STATUS } from '@/constants/tableStatus';
import { useNavigate, useParams } from 'react-router-dom';
import { socket } from '@/lib/client';
import { modals } from '@mantine/modals';
import { abbreviateNumber } from '@/utils/globalFunctions';
import { useFetch } from '@/hooks/useFetch';
import { socketEvents } from '@/constants/socketEvents';
import NiuRoadmap from './niu-roadmap';
import dealer from '@/assets/images/dealer-sample.png';
interface SocketProps {
  tableID: number;
  timer: number;
  status?: number;
}
interface Props extends Partial<TableData> {
  className?: string;
  gameType: string;
  refetchChannels?: () => void;
}

const LobbyCard = ({ className, gameType, refetchChannels, ...props }: Props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [playClick] = useSfxSound(SFX.click);
  const [remainingTime, setRemainingTime] = useState<number>(0);
  const [status, setStatus] = useState<number>(props?.tc_status as number);
  const [socketTableId, setSocketTableId] = useState<number>(props?.id as number);
  const { data, refetch } = useFetch<ServerAPIResponse<ScoreboardData | ScoreboardData2>>(
    `${gameType == 'baccarat' ? 'getresults' : 'getresults2'}?tableid=${props.id}`
  );

  const statusFormatter = (status: number) => {
    if (status === TABLE_STATUS.startGame || status == TABLE_STATUS.nextRound) {
      return t('Placing Bets');
    } else if (status === TABLE_STATUS.dealingCard) {
      return t('Dealing Cards');
    } else if (status === TABLE_STATUS.finishGame) {
      return t('Round Finished');
    } else if (status === TABLE_STATUS.openTable) {
      return t('Open Table');
    } else if (status === TABLE_STATUS.void) {
      return t('Round Voided');
    }
  };

  useEffect(() => {
    console.log('START_TIMER_LOBBY');
    const handleSendStartTimer = (data: SocketProps) => {
      if (data.tableID == props.id) {
        console.log('START_TIMER_LOBBY', data);
        setRemainingTime(data.timer);
      }
    };

    const handleStatus = (data: SocketProps) => {
      if (data.tableID == props.id) {
        setStatus(data.status as number);
        setSocketTableId(data.tableID as number);
        refetchChannels?.();
        if (
          data.status == TABLE_STATUS.nextRound ||
          data.status == TABLE_STATUS.startGame ||
          data.status == TABLE_STATUS.openTable
        ) {
          refetch();
        }
      }
    };
    socket.on('startTimerLobby', handleSendStartTimer);
    socket.on('updateTableLobby', handleStatus);
    return () => {
      socket.off('startTimerLobby', handleSendStartTimer);
      socket.off('updateTableLobby', handleStatus);
    };
  }, [props.id]);

  useEffect(() => {
    setStatus(props?.tc_status as number);
  }, [props.tc_status]);

  return (
    <div
      onClick={() => {
        if (gameType != 'niu') {
          navigate(`/table/${props?.id}?category=${gameType}`);
          playClick();
          modals.closeAll();

          if (id) {
            socket.emit(socketEvents.LEAVE_AS_PLAYER, id);
          }
        }
      }}
      className={`c-board top-bottom-line ${className}`}
    >
      <div className="c-board-header">
        <div className="c-h-title-wrapper">
          <h3>{props?.tc_gameName}</h3>
          <span>{statusFormatter((status ?? props?.tc_status) as number) ?? '---'}</span>
        </div>
        <Timer
          duration={props?.tc_timer}
          current={props.id === socketTableId ? remainingTime : 0}
        />
      </div>
      <div className="c-board-body">
        {(status == TABLE_STATUS.closeTable ||
          status == TABLE_STATUS.shuffling ||
          (status == TABLE_STATUS.maintenance && props.id === socketTableId)) && (
          <BoardResultOverlay status={status} />
        )}
        <div className="c-body-dealer" data-name={props.td_name}>
          <span className="c-dealer-name">{props.td_name}</span>
          <img src={props.td_img ?? dealer} />
        </div>
        {gameType == 'baccarat' && (
          <DynamicGrid results={data?.data?.beadPlate} board="BEAD" adjuster={3} />
        )}
        {gameType == 'niu' && (
          <NiuRoadmap results={data?.data?.beadPlate as ScoreboardData2['beadPlate']} />
        )}
      </div>
      <div className="c-board-footer">
        <div className="c-board-footer-left">
          <div className="nowrap">
            <IconUser size={20} /> <NumberFormatter value={props.tc_userCount} />
          </div>
          <Divider orientation="vertical" color="dark.4" />
          <Group wrap="nowrap" fw={700}>
            <span className="nowrap">{t('limit')}:</span>
            <span className="text-gold-gradient nowrap">
              {' '}
              {`${abbreviateNumber(props?.tc_betMin as number)} - ${abbreviateNumber(props?.tc_betMax as number)}`}
            </span>
          </Group>
        </div>
        {gameType === 'baccarat' && (
          <div className="c-board-footer-right">
            <Box w={25} h={25} className="circle red-circle text-sm">
              {data?.data?.summary?.banker ?? 0}
            </Box>
            <Box w={25} h={25} className="circle green-circle text-sm">
              {data?.data?.summary?.tie ?? 0}
            </Box>
            <Box w={25} h={25} className="circle blue-circle text-sm">
              {data?.data?.summary?.player ?? 0}
            </Box>
          </div>
        )}
      </div>
    </div>
  );
};

export default LobbyCard;
