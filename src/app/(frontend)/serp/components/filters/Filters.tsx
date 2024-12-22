// 'use client';

import { useBoolean } from '@/app/(frontend)/hooks/useBoolean';
import AdvancedFilters from '@/components/advancedFilters/AdvancedFilters';
import { generateSearchUrl } from '@/utils/generateSearchUrl';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useState } from 'react';

import Guests from './Guests';
import Price from './Price';

function Filters() {
  const router = useRouter();
  const params = useSearchParams();
  const filterParams = params.get('filters');
  const minGuests = Number(params.get('min-guests'));
  const maxGuests = Number(params.get('max-guests'));
  const minPrice = Number(params.get('min-price'));
  const maxPrice = Number(params.get('max-price'));
  const isSuperHostParams = params.get('is-super-host');
  const isFlexibleParams = params.get('is-flexible');

  const isSuperHostInitial = isSuperHostParams === 'true' ? true : false;
  const isFlexibleInitial = isFlexibleParams === 'true' ? true : false;

  const initialSelectedFilter = filterParams?.split(',') || [];

  const [selectedFilterIds, setSelectedFilterIds] = useState<string[]>(
    initialSelectedFilter,
  );
  const [selectedGuestCount, setSelectedGuestCount] = useState<{
    max: number | undefined;
    min: number | undefined;
  }>({ min: minGuests || undefined, max: maxGuests || undefined });

  const [selectedPrice, setSelectedPrice] = useState<{
    max: number | undefined;
    min: number | undefined;
  }>({ min: minPrice || undefined, max: maxPrice || undefined });

  const {
    state: isOpenFilters,
    setFalse: closeFilters,
    setTrue: openFilters,
  } = useBoolean();

  const { state: isOpenGuests, toggle: toggleGuests } = useBoolean();
  const { state: isOpenPrice, toggle: togglePrice } = useBoolean();
  const { state: isSuperHost, toggle: toggleSuperHost } =
    useBoolean(isSuperHostInitial);

  const { state: isFlexible, toggle: toggleFlexible } =
    useBoolean(isFlexibleInitial);

  const onSearch = useCallback(() => {
    const selectedLocation = params.get('locationName') || undefined;
    const selectedActivity = params.get('activity') || undefined;
    const url = generateSearchUrl({
      selectedLocation,
      selectedActivity,
      selectedFilterIds,
      selectedPrice,
      isSuperHost,
      isFlexible,

      // DISABLE FILTER BU GUEST COUNT
      selectedGuestCount,
    });
    router.push(url);
    closeFilters();
  }, [
    selectedGuestCount,
    params,
    selectedFilterIds,
    selectedPrice,
    isSuperHost,
    isFlexible,
    router,
    closeFilters,
  ]);

  return (
    <div className="flex w-full border-b border-mainGray-600 font-bold p-3">
      <Price
        isOpenPrice={isOpenPrice}
        togglePrice={togglePrice}
        selectedPrice={selectedPrice}
        setSelectedPrice={setSelectedPrice}
        onSearch={onSearch}
      />
      <Guests
        isOpenGuests={isOpenGuests}
        toggleGuests={toggleGuests}
        selectedGuestCount={selectedGuestCount}
        setSelectedGuestCount={setSelectedGuestCount}
        onSearch={onSearch}
      />
      <button
        onClick={openFilters}
        className="font-semibold p-3 px-4 border border-mainGray-600 mx-2.5 rounded-[3px] max-lg:h-[35px] max-lg:flex max-lg:items-center max-lg:justify-center max-lg:text-[12px] text-black"
      >
        Advanced filter
      </button>
      <AdvancedFilters
        setSelectedFilterIds={setSelectedFilterIds}
        selectedFilterIds={selectedFilterIds}
        open={isOpenFilters}
        setOpen={closeFilters}
        onSearch={onSearch}
        isSuperHost={isSuperHost}
        toggleSuperHost={toggleSuperHost}
        isFlexible={isFlexible}
        toggleFlexible={toggleFlexible}
      />
    </div>
  );
}

export default Filters;
