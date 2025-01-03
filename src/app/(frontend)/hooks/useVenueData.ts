import { getVenueAPI } from '@/dependencies/requests/venue';
import { getVenueKey } from '@/dependencies/cash_key';
import { VenueData } from '@/dependencies/types';

import {
  QueryObserverResult,
  RefetchOptions,
  useQuery,
} from '@tanstack/react-query';

type UseVenueData = {
  venue: VenueData | undefined;
  refetch: (
    options?: RefetchOptions,
  ) => Promise<QueryObserverResult<VenueData | undefined, Error>>;
  isLoading: boolean;
  isSuccess: boolean;
};

const useVenueData = (documentId: string): UseVenueData => {
  const {
    data: venue,
    refetch,
    isLoading,
    isSuccess,
  } = useQuery<VenueData | undefined>({
    queryKey: getVenueKey(documentId),
    queryFn: () => getVenueAPI({ documentId }),
    enabled: !!documentId,
  });

  return {
    venue,
    refetch,
    isLoading,
    isSuccess,
  };
};

export { useVenueData };
