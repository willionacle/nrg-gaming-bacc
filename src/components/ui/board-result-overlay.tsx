import { TABLE_STATUS } from '@/constants/tableStatus';
import { Text } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import closeRoomIcon from '@/assets/images/close-room-icon.png';
import shuffleIcon from '@/assets/images/shuffle-icon.png';
import maintenanceIcon from '@/assets/images/maintenance-room-icon.png';

const statusMap: Record<number, { icon: string; label: string; className: string }> = {
  [TABLE_STATUS.closeTable]: {
    icon: closeRoomIcon,
    label: 'Close Room',
    className: 'or',
  },
  [TABLE_STATUS.shuffling]: {
    icon: shuffleIcon,
    label: 'Shuffling',
    className: 'oo',
  },
  [TABLE_STATUS.maintenance]: {
    icon: maintenanceIcon,
    label: 'Maintenance',
    className: 'go',
  },
};

const BoardResultOverlay = ({ status }: { status: number }) => {
  const { t } = useTranslation();
  const overlay = statusMap[status];

  if (!overlay) return null;

  return (
    <div className={`result-overlay ${overlay.className}`}>
      <img src={overlay.icon} alt={overlay.label} />
      <Text tt="uppercase" fw="bold">
        {t(overlay.label)}
      </Text>
    </div>
  );
};

export default BoardResultOverlay;
