import { SFX } from '@/constants/sounds';
import { useSfxSound } from '@/hooks/useSfx';
import { Button, ButtonProps } from '@mantine/core';
import { useTranslation } from 'react-i18next';

interface ActionButtonProps extends ButtonProps {
  colorClass: 'purple-btn' | 'green-btn';
  label: string;
  onClick?: () => void;
}

const ActionButton = ({ colorClass, label, onClick, ...rest }: ActionButtonProps) => {
  const [playClick] = useSfxSound(SFX.click);
  const { t } = useTranslation();

  return (
    <Button
      variant="filled"
      className={`custom-btn ${colorClass}`}
      onClick={() => {
        onClick?.();
        playClick();
      }}
      {...rest}
    >
      {t(label)}
    </Button>
  );
};

export default ActionButton;
