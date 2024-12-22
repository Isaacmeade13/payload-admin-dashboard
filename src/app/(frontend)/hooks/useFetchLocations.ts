import { getLocationsKey } from '@/dependencies/cash_key';
import { getLocationsAPI } from '@/dependencies/requests/locations';
import { LocationData } from '@/dependencies/types';

import {
  QueryObserverResult,
  RefetchOptions,
  useQuery,
} from '@tanstack/react-query';

type UseFetchLocationsType = {
  locations: LocationData[];
  refetch: (
    options?: RefetchOptions,
  ) => Promise<QueryObserverResult<LocationData[] | undefined, Error>>;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: Error | null;
};

type FetchLocationsParams = {
  locationNameId?: string;
  filterIds?: string;
  guests?: string;
  price?: string;
  minGuestsCount?: string;
  maxGuestsCount?: string;
  minPrice?: string;
  maxPrice?: string;
  isSuperHost: string;
  isFlexible: string;
  activity: string | undefined | null;
};

const useFetchLocations = ({
  locationNameId = '',
  filterIds = '',
  guests = '',
  price = '',
  minGuestsCount,
  maxGuestsCount,
  minPrice,
  maxPrice,
  activity,
  isSuperHost,
  isFlexible,
}: FetchLocationsParams): UseFetchLocationsType => {
  const queryKey = getLocationsKey(
    locationNameId,
    filterIds,
    guests,
    price,
    isSuperHost,
    isFlexible,
    activity,
  );

  const {
    data: locations,
    refetch,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useQuery<LocationData[] | undefined, Error>({
    queryKey,
    queryFn: () =>
      getLocationsAPI({
        locationNameId,
        filterIds,
        maxGuestsCount,
        minGuestsCount,
        maxPrice,
        minPrice,
        isSuperHost,
        isFlexible,
        activity,
      }),
  });

  return {
    locations: locations ?? [],
    refetch,
    isLoading,
    isSuccess,
    isError,
    error: isError ? error : null,
  };
};

export { useFetchLocations };
