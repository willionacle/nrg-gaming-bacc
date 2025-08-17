import { BetType } from '@/types';

export const abbreviateNumber = (num: number = 0): string => {
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
  } else if (num >= 1_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return num.toString();
};

export const getOriginalBoundingRect = (element: HTMLElement) => {
  if (!element) return null;

  const rect = element.getBoundingClientRect();

  const computedStyle = window.getComputedStyle(document.body);
  const transform = computedStyle.transform;

  if (!transform || transform === 'none') {
    return rect; // No scaling applied
  }

  const matrix = new DOMMatrixReadOnly(transform);
  const scaleX = matrix.a; // Scale X
  const scaleY = matrix.d; // Scale Y

  const bodyWidth = document.body.offsetWidth;
  const bodyHeight = document.body.offsetHeight;
  const viewportWidth = document.documentElement.clientWidth;
  const viewportHeight = document.documentElement.clientHeight;

  const bodyShiftX = (viewportWidth - bodyWidth * scaleX) / 2;
  const bodyShiftY = (viewportHeight - bodyHeight * scaleY) / 2;

  return {
    x: (rect.left - bodyShiftX) / scaleX,
    y: (rect.top - bodyShiftY) / scaleY,
    width: rect.width / scaleX,
    height: rect.height / scaleY,
  };
};

export const getOriginalPoint = (clientX: number, clientY: number) => {
  const body = document.body;
  const style = getComputedStyle(body);
  const transform = style.transform;

  if (!transform || transform === 'none') {
    return { x: clientX, y: clientY };
  }

  const matrix = new DOMMatrixReadOnly(transform);
  const scaleX = matrix.a;
  const scaleY = matrix.d;

  const offsetX = (window.innerWidth - body.offsetWidth * scaleX) / 2;
  const offsetY = (window.innerHeight - body.offsetHeight * scaleY) / 2;

  return {
    x: (clientX - offsetX) / scaleX,
    y: (clientY - offsetY) / scaleY,
  };
};

export const isLandscape = () => {
  return window.innerWidth > window.innerHeight;
};

export const calculateBoxes = (containerWidth: number, containerHeight: number, rows: number) => {
  const boxSize = Math.floor(containerHeight / rows);
  const columns = Math.floor(containerWidth / boxSize);
  const totalBoxes = rows * columns;

  return { boxSize, columns, totalBoxes };
};

export function getBaccaratPayoutRatio(betType: BetType | string): string {
  switch (betType) {
    case 'PLAYER':
      return '1:1';
    case 'BANKER':
      return '0.95:1';
    case 'TIE':
      return '8:1';
    case 'PPAIR':
    case 'BPAIR':
      return '11:1';
    default:
      return '0:1';
  }
}
