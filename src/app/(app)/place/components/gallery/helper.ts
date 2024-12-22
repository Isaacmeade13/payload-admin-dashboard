import clsx from 'clsx';

const getPosition = (index: number, imageCount: number) => {
  if (imageCount === 1) {
    return {
      colStart: 1,
      colEnd: 6,
      rowStart: 1,
      rowEnd: 3,
    };
  }

  if (imageCount === 2) {
    return {
      colStart: index === 0 ? 1 : 4,
      colEnd: index === 0 ? 4 : 6,
      rowStart: 1,
      rowEnd: 3,
    };
  }

  if (imageCount === 3) {
    if (index === 0) {
      return {
        colStart: 1,
        colEnd: 4,
        rowStart: 1,
        rowEnd: 3,
      };
    }
    return {
      colStart: 4,
      colEnd: 6,
    };
  }

  if (imageCount === 4) {
    if (index === 0) {
      return {
        colStart: 1,
        colEnd: 4,
        rowStart: 1,
        rowEnd: 3,
      };
    } else if (index > 1) {
      return {
        colStart: index === 2 ? 4 : 5,
        colEnd: index === 2 ? 5 : 6,
      };
    }
    return {
      colStart: 4,
      colEnd: 6,
    };
  }

  return {
    colStart: 1,
    colEnd: 6,
    rowStart: 1,
    rowEnd: 3,
  };
};

interface Position {
  colStart: number;
  colEnd: number;
  rowStart?: number;
  rowEnd?: number;
}

function getImageClasses(
  position: Position,
  isBlurred: boolean,
  index: number,
): string {
  const { colStart, colEnd, rowStart, rowEnd } = position;
  return clsx(
    'h-full',
    'object-cover',
    `col-start-${colStart}`,
    `col-end-${colEnd}`,
    {
      [`row-start-${rowStart}`]: rowStart !== undefined,
      [`row-end-${rowEnd}`]: rowEnd !== undefined,
    },
    { 'max-xl:hidden': index > 0 },
    {
      'blur-sm': isBlurred,
    },
  );
}

export { getPosition, getImageClasses };
