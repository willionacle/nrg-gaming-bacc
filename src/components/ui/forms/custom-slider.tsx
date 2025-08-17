import { SFX } from "@/constants/sounds";
import { useSfxSound } from "@/hooks/useSfx";
import {
  ActionIcon,
  Box,
  Group,
  Slider,
  SliderProps,
  Text,
} from "@mantine/core";
import {
  IconVolume,
  IconVolumeOff,
} from "@tabler/icons-react";

interface Props extends SliderProps {
  label: string;
  onChangeIcon?: (data: boolean) => void;
  isMuted?: boolean;
}

const CustomSlider = ({
  label,
  isMuted = false,
  onChangeIcon,
  ...props
}: Props) => {
  const [playClick] = useSfxSound(SFX.click);

  return (
    <Box>
      <Text size="sm">{label}</Text>
      <Group
        w="100%"
        align="center"
        gap="4px"
        wrap="nowrap"
        pr={isMuted ? "xs" : 0}
      >
        {onChangeIcon && (
          <ActionIcon
            variant="subtle"
            onClick={() => {
              onChangeIcon(!isMuted), playClick();
            }}
          >
            {isMuted ? <IconVolumeOff /> : <IconVolume />}
          </ActionIcon>
        )}
        <Slider
          thumbChildren={<Box className="custom-slider-thumb" w={27} h={27} />}
          color="red"
          defaultValue={0}
          thumbSize={26}
          size="lg"
          w="100%"
          styles={{ thumb: { borderWidth: 0, padding: 0 } }}
          disabled={isMuted}
          {...props}
        />
      </Group>
    </Box>
  );
};

export default CustomSlider;
