import { getRemainingVenuesKey } from '@/dependencies/cash_key';
import { getRemainingVenuesAPI } from '@/dependencies/requests/remainingVenues';
import { VenueData } from '@/dependencies/types';
import {
  QueryObserverResult,
  RefetchOptions,
  useQuery,
} from '@tanstack/react-query';

type UseFetchRemainingVenuesType = {
  remainingVenues: VenueData[];
  refetch: (
    options?: RefetchOptions,
  ) => Promise<QueryObserverResult<VenueData[] | undefined, Error>>;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: Error | null;
};

type FetchVenuesParams = {
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

const useFetchRemainingVenues = ({
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
}: FetchVenuesParams): UseFetchRemainingVenuesType => {
  const {
    data: remainingVenues,
    refetch,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useQuery<VenueData[] | undefined, Error>({
    queryKey: getRemainingVenuesKey(
      locationNameId,
      filterIds,
      guests,
      price,
      isSuperHost,
      isFlexible,
      activity,
    ),
    queryFn: () =>
      getRemainingVenuesAPI({
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
    remainingVenues: remainingVenues ?? [],
    refetch,
    isLoading,
    isSuccess,
    isError,
    error: isError ? error : null,
  };
};

export { useFetchRemainingVenues };
