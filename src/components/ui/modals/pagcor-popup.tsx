import { Anchor, Box, Divider, Group, List, Stack, ThemeIcon, Title } from '@mantine/core';
import pagcor from '@/assets/images/pagcor.svg';
import { IconCircleCheck } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { ActionButton } from '../buttons';
import { modals } from '@mantine/modals';
const PagcorPopup = () => {
  const { t } = useTranslation();
  return (
    <Box className="pagcor-popup">
      <Stack align="center" ta="center" justify="center" mb="md">
        <Box w={90}>
          <img src={pagcor} />
        </Box>
        <Title className="title">
          {t('KEEP IT FUN.')}
          <br />
          {t('GAME RESPONSIBLY.')}
        </Title>
      </Stack>
      <Box p="lg" className="rules-list">
        <List
          icon={
            <ThemeIcon color="#11ff95" size={24} radius="xl">
              <IconCircleCheck color="black" size={16} />
            </ThemeIcon>
          }
          spacing="xs"
          size="xl"
          center
        >
          <List.Item>{t('Gaming is for 21 years old and above only.')}</List.Item>
          <List.Item>{t('Set limits. Don’t chase losses.')}</List.Item>
          <List.Item>{t('Play within your means.')}</List.Item>
        </List>
      </Box>
      <Divider my="xl" />
      <Box ta="center">
        <Title mb="sm" className="need-help">
          {t('NEED HELP?')}
        </Title>
        <List className="list-bottom" size="md" center>
          <List.Item>
            📞{' '}
            <Anchor c="white" href="tel:+63285389090" target="_blank" underline="hover">
              {t('Responsible Gambling Helpline')}: (02) 8538 9090
            </Anchor>
          </List.Item>
          <List.Item>
            📩{' '}
            <Anchor
              c="white"
              href="mailto:ResponsibleGaming@pagcor.ph"
              target="_blank"
              underline="hover"
            >
              {t('ResponsibleGaming@pagcor.ph')}
            </Anchor>
          </List.Item>
        </List>
      </Box>
      <Group justify="center" mt="lg">
        <ActionButton
          onClick={() => {
            modals.closeAll();
          }}
          colorClass="green-btn"
          label="confirm"
        />
      </Group>
    </Box>
  );
};

export default PagcorPopup;
