import clsx from 'clsx';

function getArrowClasses(isVertical: boolean): string {
  return clsx(
    'w-[14px]',
    'h-[14px]',
    'border-r-black',
    'border-b-black',
    'border-r',
    'border-b',
    '-skew-y-6',
    '-skew-x-6',
    'cursor-pointer',
    {
      'rotate-[225deg]': isVertical,
      'rotate-45': !isVertical,
    },
  );
}

function getDescriptionClasses(isBlock: boolean): string {
  return clsx('text-sm', 'text-mainGrey-200', 'max-xl-text-[16px] pt-4', {
    block: isBlock,
    hidden: !isBlock,
  });
}

export { getArrowClasses, getDescriptionClasses };
