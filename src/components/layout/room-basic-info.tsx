import tableInfoStore from '@/store/tableInfoStore';
import { Box, Divider, Group, NumberFormatter, Text } from '@mantine/core';
import React from 'react';
import { useTranslation } from 'react-i18next';

const RoomBasicInfo = () => {
  const tableInfo = tableInfoStore((state) => state.tableInfo);
  const { t } = useTranslation();

  const roomDetails = [
    { label: 'Name', value: tableInfo?.tc_gameName ?? '-' },
    { label: 'Number', value: tableInfo?.tc_id ?? '-' },
    {
      label: 'Bet Limit',
      value: `${tableInfo?.betlimit?.min_bet ?? 0} - ${tableInfo?.betlimit?.max_bet ?? 0}`,
      isFormatted: true,
    },
    { label: 'Users', value: tableInfo?.tc_userCount ?? 0 },
  ];

  return (
    <Group className="room-basic-info">
      {roomDetails?.map((item, idx) => (
        <React.Fragment key={idx}>
          {idx > 0 && <Divider orientation="vertical" />}
          <Box key={idx}>
            <Text mb={2} fw={300}>
              {t(item.label)}
            </Text>
            <Text c="orange.6" fw={700}>
              {item.isFormatted ? (
                <>
                  <NumberFormatter value={tableInfo?.betlimit?.min_bet ?? 0} /> -{' '}
                  <NumberFormatter value={tableInfo?.betlimit?.max_bet ?? 0} />
                </>
              ) : (
                item.value
              )}
            </Text>
          </Box>
        </React.Fragment>
      ))}
    </Group>
  );
};

export default RoomBasicInfo;
