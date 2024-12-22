// 'use client';

import RoundedCheckbox from '@/app/(frontend)/components/RoundedCheckbox';
import { price } from '@/utils/mockData';
import { Popover } from '@headlessui/react';
import clsx from 'clsx';
import { Dispatch, SetStateAction, useCallback } from 'react';

type PriceProps = {
  isOpenPrice: boolean;
  togglePrice: () => void;
  setSelectedPrice: Dispatch<
    SetStateAction<{
      max: number | undefined;
      min: number | undefined;
    }>
  >;
  selectedPrice: {
    max: number | undefined;
    min: number | undefined;
  };
  onSearch: () => void;
};

function Price({
  isOpenPrice,
  togglePrice,
  selectedPrice,
  setSelectedPrice,
  onSearch,
}: PriceProps) {
  const { min: selectedMin, max: selectedMax } = selectedPrice;

  const isChecked = useCallback(
    (
      selectedMax: number | undefined,
      selectedMin: number | undefined,
      min: number | undefined,
      max: number | undefined,
    ) => {
      return selectedMax === max && selectedMin === min;
    },
    [],
  );

  const handleClick = useCallback(
    (close: () => void) => {
      togglePrice();
      onSearch();
      close();
    },
    [onSearch, togglePrice],
  );

  return (
    <>
      {isOpenPrice && (
        <button
          onClick={togglePrice}
          className="fixed inset-0 bg-gray-500 bg-opacity-75 z-[9]"
          aria-hidden="true"
        ></button>
      )}
      <div>
        <Popover className="relative z-[9]">
          <Popover.Button
            onClick={togglePrice}
            className={clsx(
              'font-semibold p-3 px-4 border border-mainGray-600 mx-2.5 rounded-[3px] max-lg:h-[35px] max-lg:flex max-lg:items-center max-lg:justify-center max-lg:text-[12px] text-black',
              { 'bg-white': isOpenPrice },
            )}
          >
            Price
          </Popover.Button>
          <Popover.Panel className="absolute left-[10px] z-10 bg-white border border-mainGray-600 rounded-[3px] w-[20%] p-[23px]  min-w-[219px]">
            {({ close }) => (
              <>
                {price.map(({ min, max, title }) => (
                  <RoundedCheckbox
                    className="mb-[10px]"
                    key={title}
                    checked={isChecked(selectedMax, selectedMin, min, max)}
                    onChange={() => {
                      setSelectedPrice({ min, max });
                    }}
                  >
                    <p className="font-normal text-mainGrey-100">{title}</p>
                  </RoundedCheckbox>
                ))}
                <div className="flex pt-[24px]">
                  <button
                    onClick={() => {
                      handleClick(close);
                    }}
                    className="px-[14px] py-[7px] bg-mainGrey-200 text-white rounded-[2px] ml-auto"
                  >
                    Done
                  </button>
                </div>
              </>
            )}
          </Popover.Panel>
        </Popover>
      </div>
    </>
  );
}

export default Price;
