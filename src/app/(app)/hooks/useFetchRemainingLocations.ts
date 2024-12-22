import { getRemainingLocationsKey } from '@/dependencies/cash_key';
import { getRemainingLocationsAPI } from '@/dependencies/requests/remainingLocations';
import { LocationData } from '@/dependencies/types';
import {
  QueryObserverResult,
  RefetchOptions,
  useQuery,
} from '@tanstack/react-query';

type UseFetchRemainingLocationsType = {
  remainingLocations: LocationData[];
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

const useFetchRemainingLocations = ({
  locationNameId = undefined,
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
}: FetchLocationsParams): UseFetchRemainingLocationsType => {
  const {
    data: locations,
    refetch,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useQuery<LocationData[] | undefined, Error>({
    queryKey: getRemainingLocationsKey(
      locationNameId,
      filterIds,
      guests,
      price,
      isSuperHost,
      isFlexible,
      activity,
    ),
    queryFn: () =>
      getRemainingLocationsAPI({
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
    remainingLocations: locations ?? [],
    refetch,
    isLoading,
    isSuccess,
    isError,
    error: isError ? error : null,
  };
};

export { useFetchRemainingLocations };
