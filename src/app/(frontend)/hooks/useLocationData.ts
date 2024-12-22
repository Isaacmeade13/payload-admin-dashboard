import { getLocationAPI } from '@/dependencies/requests/location';
import { getLocationKey } from '@/dependencies/cash_key';
import { LocationData } from '@/dependencies/types';

import {
  QueryObserverResult,
  RefetchOptions,
  useQuery,
} from '@tanstack/react-query';

type UseLocationData = {
  location: LocationData | undefined;
  refetch: (
    options?: RefetchOptions,
  ) => Promise<QueryObserverResult<LocationData | undefined, Error>>;
  isLoading: boolean;
  isSuccess: boolean;
};

const useLocationData = (documentId: string): UseLocationData => {
  const {
    data: location,
    refetch,
    isLoading,
    isSuccess,
  } = useQuery<LocationData | undefined>({
    queryKey: getLocationKey(documentId),
    queryFn: () => getLocationAPI({ documentId }),
    enabled: !!documentId,
  });

  return {
    location,
    refetch,
    isLoading,
    isSuccess,
  };
};

export { useLocationData };
