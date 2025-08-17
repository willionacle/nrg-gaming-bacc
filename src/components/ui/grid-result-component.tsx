import {
  BeadPlateItem,
  BigEyeBoyItem,
  BigRoadItem,
  Board,
  CockroachPigItem,
  SmallRoadItem,
} from '@/types';
import { Box, Text } from '@mantine/core';
import React from 'react';

interface Size {
  width: number;
  height: number;
}

interface Props {
  adjuster?: number;
  result?: BigEyeBoyItem | BeadPlateItem | CockroachPigItem | SmallRoadItem | BigRoadItem;
  size?: Size;
  board: Board;
}

const GridResultComponent = ({
  adjuster = 0,
  size = { width: 0, height: 0 },
  result,
  board,
}: Props) => {
  if (!result) return null;

  const results = result?.result?.split('/');
  const tieCount = results?.filter((item) => item === 'T').length ?? 0;

  const getWidth = (item: string): string | undefined => {
    if (['PP', 'BP'].includes(item)) {
      if (board === 'BIG') return '5px';
      if (board === 'BEAD') return '8px';
    }
    return adjuster ? `calc(${size.width}px - ${adjuster}px)` : undefined;
  };

  const getClass = (item: string): string => {
    const resultMap: Record<Board, Record<string, string>> = {
      BIG: {
        P: 'outline-blue',
        PP: 'fill-blue-small bottom-right',
        B: 'outline-red',
        BP: 'fill-red-small top-left',
        T: 'line-green',
      },
      NIUBIG: {
        B: 'outline-blue',
        R: 'outline-red',
        T: 'line-green',
      },
      BEAD: {
        P: 'blue',
        PP: 'fill-blue-small bottom-right',
        B: 'red',
        BP: 'fill-red-small top-left',
        T: 'green',
      },
      BIGEYEBOY: {
        B: 'outline-blue-small',
        R: 'outline-red-small',
      },
      SMALL: {
        B: 'fill-blue',
        R: 'fill-red',
      },
      COCKROACH: {
        B: 'line-blue',
        R: 'line-red',
      },
    };

    return resultMap[board]?.[item] ?? '';
  };

  return (
    <>
      {results?.map((item, key) => (
        <React.Fragment key={key}>
          <Box
            className={`result ${getClass(item)} content-center-2 ${result.lastresult ? 'blink-infinite' : ''}`}
            w={getWidth(item)}
          />
        </React.Fragment>
      ))}
      {tieCount > 1 && (
        <Text c="dark.2" fz={12} className="content-center-2 tie-count">
          {tieCount}
        </Text>
      )}
    </>
  );
};

export default GridResultComponent;
