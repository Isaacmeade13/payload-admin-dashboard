// 'use client';

import RoundedCheckbox from '@/app/components/RoundedCheckbox';
import { guests } from '@/utils/mockData';
import { Popover } from '@headlessui/react';
import clsx from 'clsx';
import { Dispatch, SetStateAction, useCallback } from 'react';

type GuestsProps = {
  isOpenGuests: boolean;
  toggleGuests: () => void;
  setSelectedGuestCount: Dispatch<
    SetStateAction<{
      max: number | undefined;
      min: number | undefined;
    }>
  >;
  selectedGuestCount: {
    max: number | undefined;
    min: number | undefined;
  };
  onSearch: () => void;
};
function Guests({
  isOpenGuests,
  toggleGuests,
  setSelectedGuestCount,
  selectedGuestCount,
  onSearch,
}: GuestsProps) {
  const { min: selectedMin, max: selectedMax } = selectedGuestCount;

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
      toggleGuests();
      onSearch();
      close();
    },
    [onSearch, toggleGuests],
  );
  return (
    <>
      {isOpenGuests && (
        <button
          onClick={toggleGuests}
          className="fixed inset-0 bg-gray-500 bg-opacity-75 z-[9]"
          aria-hidden="true"
        ></button>
      )}
      <div>
        <Popover className={clsx('relative', { 'z-[9]': isOpenGuests })}>
          <Popover.Button
            onClick={toggleGuests}
            className={clsx(
              'font-semibold p-3 px-4 border border-mainGray-600 mx-2.5 rounded-[3px] max-lg:h-[35px] max-lg:flex max-lg:items-center max-lg:justify-center max-lg:text-[12px] text-black',
              { 'bg-white': isOpenGuests },
            )}
          >
            Guests
          </Popover.Button>
          <Popover.Panel className="absolute left-[10px] z-10 bg-white border border-mainGray-600 rounded-[3px] w-[20%] p-[23px]  min-w-[219px]">
            {({ close }) => (
              <>
                {guests.map(({ min, max, title }) => (
                  <RoundedCheckbox
                    className="mb-[10px]"
                    key={title}
                    checked={isChecked(selectedMax, selectedMin, min, max)}
                    onChange={() => setSelectedGuestCount({ min, max })}
                  >
                    <p className="font-normal text-mainGrey-100">{title}</p>
                  </RoundedCheckbox>
                ))}
                <div className="flex pt-[24px]">
                  <button
                    onClick={() => handleClick(close)}
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

export default Guests;
