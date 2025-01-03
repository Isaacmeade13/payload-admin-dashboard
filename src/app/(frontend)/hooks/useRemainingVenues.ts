import { useSearchParams } from 'next/navigation';
import { VenueData } from '@/dependencies/types';
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';

import { useFetchRemainingVenues } from './useFetchRemainingVenues';

type UseRemainingVenuesDataType = {
  remainingVenues: VenueData[];
  refetch: (
    options?: RefetchOptions,
  ) => Promise<QueryObserverResult<VenueData[] | undefined, Error>>;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: Error | null;
};

const useRemainingVenuesData = (): UseRemainingVenuesDataType => {
  const searchParams = useSearchParams();
  const locationNameId = searchParams.get('locationName') || undefined;
  const filterIds = searchParams.get('filters') || '';
  const isSuperHost = searchParams.get('is-super-host') || '';
  const isFlexible = searchParams.get('is-flexible') || '';
  const minGuestsCount = searchParams.get('min-guests') || '';
  const maxGuestsCount = searchParams.get('max-guests') || '';
  const minPrice = searchParams.get('min-price') || '';
  const maxPrice = searchParams.get('max-price') || '';
  const activity = searchParams.get('activity');

  const guests = `${minGuestsCount}-${maxGuestsCount}`;
  const price = `${minPrice}-${maxPrice}`;

  return useFetchRemainingVenues({
    locationNameId,
    filterIds,
    guests,
    price,
    minGuestsCount: minGuestsCount !== '' ? minGuestsCount : undefined,
    maxGuestsCount: maxGuestsCount !== '' ? maxGuestsCount : undefined,
    minPrice: minPrice !== '' ? minPrice : undefined,
    maxPrice: maxPrice !== '' ? maxPrice : undefined,
    isSuperHost,
    isFlexible,
    activity,
  });
};

export { useRemainingVenuesData };
