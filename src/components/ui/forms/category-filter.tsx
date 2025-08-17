import { JSX, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Group, ScrollArea } from '@mantine/core';
import clsx from 'clsx';
import { IconCards, IconLayoutGrid, IconPlayCard, IconWheel } from '@tabler/icons-react';
import { NiuBtn } from '../buttons';
import { useTranslation } from 'react-i18next';
import { Categories, ServerAPIResponse } from '@/types';
import { useFetch } from '@/hooks/useFetch';

const categories: Record<'all' | 'baccarat' | 'dragon-tiger' | 'roulette', JSX.Element> = {
  all: <IconLayoutGrid />,
  baccarat: <IconPlayCard />,
  'dragon-tiger': <IconCards />,
  roulette: <IconWheel />,
};

interface Props {
  setCategory: (data: string) => void;
}
const CategoryFilter = ({ setCategory }: Props) => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const { data } = useFetch<ServerAPIResponse<Categories[]>>(`categories`);

  const currentCategory = searchParams.get('category') || 'all';
  const [selectedCategory, setSelectedCategory] = useState(currentCategory);

  useEffect(() => {
    const normalized = currentCategory.toLowerCase();
    setSelectedCategory(normalized);
    setCategory(normalized);

    const newParams = new URLSearchParams(searchParams);

    newParams.set('category', normalized);

    setSearchParams(newParams);
  }, [currentCategory, searchParams]);

  const handleClick = (category: string) => {
    setSelectedCategory(category);
    setCategory(category);
    const newParams = new URLSearchParams(searchParams);
    newParams.set('category', category);
    setSearchParams(newParams);
  };

  return (
    <ScrollArea>
      <Group wrap="nowrap" gap="xs" className="cat-filter-wrapper" mb={0} pb={0} p="sm">
        {data?.data?.map((item, idx) => (
          <NiuBtn
            key={idx}
            onClick={() => handleClick(item.tc_gameType)}
            classProps={clsx({ active: selectedCategory === item.tc_gameType })}
            leftSection={
              categories[(item?.tc_gameType as keyof typeof categories) ?? 'all'] ?? <IconCards />
            }
            radius="xs"
            miw={138}
            hasSides
          >
            {t(item.tc_gameType)}
          </NiuBtn>
        ))}
      </Group>
    </ScrollArea>
  );
};

export default CategoryFilter;
