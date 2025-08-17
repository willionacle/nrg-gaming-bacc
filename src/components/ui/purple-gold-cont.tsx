import { Box, BoxProps } from '@mantine/core';

interface Props extends BoxProps {
  rounded?: boolean;
  isIndicator?: boolean;
  children: React.ReactNode;
  classProp?: string;
}

const PurpleGoldCont = ({
  rounded = false,
  isIndicator = false,
  children,
  classProp,
  ...props
}: Props) => {
  return (
    <Box
      className={`main-text-panel ${classProp} ${rounded ? 'rounded' : ''} ${isIndicator ? 'join-table-indicator' : ''}`}
      {...props}
    >
      {children}
    </Box>
  );
};

export default PurpleGoldCont;
