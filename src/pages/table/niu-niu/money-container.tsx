import { Group, Image, NumberFormatter, Text, TextProps } from '@mantine/core';
import coin from '@/assets/images/icons/coin.svg';

interface Props extends TextProps {
  value?: string | number | undefined;
}

const MoneyContainer = ({ value = 0 }: Props) => {
  return (
    <Group gap={5} className="money-cont" wrap="nowrap">
      <Image width={20} fit="contain" height={20} src={coin} />
      <Text c="yellow.2">
        <NumberFormatter value={value} />
      </Text>
    </Group>
  );
};

export default MoneyContainer;
