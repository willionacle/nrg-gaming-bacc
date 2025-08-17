import { useChipsStore } from '@/store/chipStore';
import { Checkbox, SimpleGrid, Stack } from '@mantine/core';
import { StaticChip } from '../buttons';
import { useSfxSound } from '@/hooks/useSfx';
import { SFX } from '@/constants/sounds';
import tableInfoStore from '@/store/tableInfoStore';
import { useEffect } from 'react';

const ChipSettingsModal = () => {
  const [playClick] = useSfxSound(SFX.click);
  const setFromBetchips = useChipsStore((s) => s.setFromBetchips);
  const tableInfo = tableInfoStore((s) => s.tableInfo);
  const chips = useChipsStore((state) => state.chips);
  const toggleChip = useChipsStore((state) => state.toggleChip);

  useEffect(() => {
    if (tableInfo?.betchips) {
      setFromBetchips(tableInfo.betchips);
    }
    // stringify to avoid ref-churn re-runs
  }, [JSON.stringify(tableInfo?.betchips), setFromBetchips]);

  return (
    <SimpleGrid cols={4} spacing="xl" className="chip-settings" py="xl">
      {chips.map((chip, idx) => (
        <Stack
          align="center"
          gap="xs"
          onClick={() => {
            toggleChip(chip.amount), playClick();
          }}
          key={idx}
        >
          <StaticChip
            style={{ filter: chip.selected ? '' : 'grayscale(1)' }}
            chip={chip.color}
            amount={chip.amount}
          />
          <Checkbox
            key={chip.amount}
            label={`${chip.amount.toLocaleString()} (${chip.color})`}
            checked={chip.selected}
            color={chip.color}
          />
        </Stack>
      ))}
    </SimpleGrid>
  );
};

export default ChipSettingsModal;
