'use client';
import {
  BeadPlateItem,
  BigEyeBoyItem,
  BigRoadItem,
  Board,
  CockroachPigItem,
  SmallRoadItem,
} from '@/types';
import { calculateBoxes } from '@/utils/globalFunctions';
import { useEffect, useState, useRef } from 'react';
import GridResultComponent from './grid-result-component';
import clsx from 'clsx';
import useThemeStore from '@/store/themeStore';
interface Props {
  adjuster?: number;
  rows?: number;
  cols?: number;
  results?: BigEyeBoyItem[] | BeadPlateItem[] | CockroachPigItem | SmallRoadItem[] | BigRoadItem[];
  result?: BigEyeBoyItem | BeadPlateItem | CockroachPigItem | SmallRoadItem | BigRoadItem;
  board?: Board;
}

const Item = ({ rows = 6, cols = 0, result, adjuster, board = 'BIG' }: Props) => {
  const liRef = useRef<HTMLLIElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setSize({
      width: liRef?.current?.clientWidth as number,
      height: liRef?.current?.clientHeight as number,
    });
  }, [liRef]);

  return (
    <li
      ref={liRef}
      className={`relative ${board}`}
      style={{ height: `calc(100% / ${rows}`, width: `calc(100% / ${cols}` }}
    >
      <GridResultComponent board={board} size={size} adjuster={adjuster} result={result} />
    </li>
  );
};

export default function DynamicGrid({ adjuster = 0, rows = 6, results, board = 'BIG' }: Props) {
  const { scoreboardTheme } = useThemeStore();
  const ulRef = useRef<HTMLUListElement>(null);
  const [totalBoxes, setTotalBoxes] = useState(0);
  const [cols, setCols] = useState(0);

  useEffect(() => {
    const updateGridSize = () => {
      if (ulRef.current) {
        const boxes = calculateBoxes(ulRef.current.clientWidth, ulRef.current.clientHeight, rows);
        setTotalBoxes(boxes.totalBoxes);
        setCols(boxes.columns);
      }
    };

    updateGridSize();
    window.addEventListener('resize', updateGridSize);
    return () => window.removeEventListener('resize', updateGridSize);
  }, [rows]);

  const maxCol = Array.isArray(results) ? Math.max(...results.map((r) => r.col ?? 0)) : 0;

  const shouldSlice = maxCol >= cols;
  const slicedResults = Array.isArray(results)
    ? shouldSlice
      ? results.slice(-totalBoxes)
      : results
    : [];

  const colOffset = shouldSlice ? maxCol - cols + 1 : 0;

  return (
    <ul ref={ulRef} className={clsx('card-roard', scoreboardTheme === 'light' && 'light')}>
      {Array.from({ length: totalBoxes }).map((_, idx) => {
        const row = idx % rows;
        const col = Math.floor(idx / rows) + colOffset;

        const match = slicedResults?.find((r) => r.row === row && r.col === col);

        return (
          <Item
            result={match}
            key={idx}
            rows={rows}
            board={board}
            cols={cols}
            adjuster={adjuster}
          />
        );
      })}
    </ul>
  );
}
