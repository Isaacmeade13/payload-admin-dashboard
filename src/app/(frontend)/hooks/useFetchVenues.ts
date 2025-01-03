import { getVenuesKey } from '@/dependencies/cash_key';
import { getVenuesAPI } from '@/dependencies/requests/venues';
import { VenueData } from '@/dependencies/types';

import {
  QueryObserverResult,
  RefetchOptions,
  useQuery,
} from '@tanstack/react-query';

type UseFetchVenuesType = {
  venues: VenueData[];
  refetch: (
    options?: RefetchOptions,
  ) => Promise<QueryObserverResult<VenueData[] | undefined, Error>>;
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

const useFetchVenues = ({
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
}: FetchLocationsParams): UseFetchVenuesType => {
  const queryKey = getVenuesKey(
    locationNameId,
    filterIds,
    guests,
    price,
    isSuperHost,
    isFlexible,
    activity,
  );

  const {
    data: venues,
    refetch,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useQuery<VenueData[] | undefined, Error>({
    queryKey,
    queryFn: () =>
      getVenuesAPI({
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
    venues: venues ?? [],
    refetch,
    isLoading,
    isSuccess,
    isError,
    error: isError ? error : null,
  };
};

export { useFetchVenues };
