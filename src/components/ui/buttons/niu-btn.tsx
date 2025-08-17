import { Button, ButtonProps, Tooltip, TooltipProps } from '@mantine/core';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

interface Props extends ButtonProps {
  circular?: boolean;
  children: any;
  tooltip?: string;
  classProps?: string;
  onClick?: (data?: any) => void;
  disableToolTip?: boolean;
  type?: 'button' | 'submit' | 'reset' | undefined;
  dark?: boolean;
  btnSize?: 'sm' | 'lg' | 'xl';
  hasSides?: boolean;
  toolTipPos?: TooltipProps['position'];
}

const NiuBtn = ({
  circular = false,
  tooltip = '',
  children,
  classProps,
  onClick,
  disableToolTip = false,
  type = 'button',
  dark = false,
  btnSize,
  hasSides = false,
  toolTipPos = 'bottom',
  ...props
}: Props) => {
  const { t } = useTranslation();
  return (
    <Tooltip label={t(tooltip)} position={toolTipPos} disabled={!tooltip || disableToolTip}>
      <Button
        className={clsx(
          `niu-btn ${btnSize}`,
          { circular },
          classProps,
          dark && 'dark',
          hasSides && 'has-sides'
        )}
        variant="filled"
        radius="xl"
        size="lg"
        type={type}
        onClick={() => {
          onClick && onClick();
        }}
        {...props}
      >
        {children}
      </Button>
    </Tooltip>
  );
};

export default NiuBtn;
