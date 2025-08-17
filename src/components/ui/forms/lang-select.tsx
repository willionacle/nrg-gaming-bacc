'use client';

import { Box, Group, Select, SelectProps } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import useLangStore from '@/store/language';
import en from '@/assets/images/flags/en.svg';
import kr from '@/assets/images/flags/kr.svg';
import jp from '@/assets/images/flags/jp.svg';
import cn from '@/assets/images/flags/cn.svg';
import vn from '@/assets/images/flags/vn.svg';

const icons: Record<string, string> = {
  en,
  kr,
  jp,
  cn,
  vn,
};

const LangSelect = ({ ...props }: SelectProps) => {
  const { i18n } = useTranslation();
  const { language, setLanguage } = useLangStore();

  const handleChange = (value: string | null) => {
    if (!value) return;
    setLanguage(value as any); // persist to zustand
    i18n.changeLanguage(value); // apply to i18next
  };

  const renderSelectOption: SelectProps['renderOption'] = ({ option, checked }) => (
    <Group flex="1" gap="xs">
      <Box w={30}>
        <img src={icons[option.value]} alt={option.label} />
      </Box>
      {option.label}
      {checked && <IconCheck style={{ marginInlineStart: 'auto' }} />}
    </Group>
  );

  return (
    <Select
      value={language}
      onChange={handleChange}
      data={[
        { value: 'en', label: 'English' },
        { value: 'kr', label: '한국어' },
        { value: 'jp', label: '日本語' },
        { value: 'cn', label: '简体中文' },
        { value: 'vn', label: 'Tiếng Việt' },
      ]}
      renderOption={renderSelectOption}
      clearable={false}
      allowDeselect={false}
      {...props}
    />
  );
};

export default LangSelect;
