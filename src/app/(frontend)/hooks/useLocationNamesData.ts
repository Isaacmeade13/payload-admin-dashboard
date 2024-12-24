import { getLocationNamesKey } from '@/dependencies/cash_key';
import { getLocationNamesAPI } from '@/dependencies/requests/locationNames';
import { LocationName } from '@/dependencies/types';
import {
  QueryObserverResult,
  RefetchOptions,
  useQuery,
} from '@tanstack/react-query';

type UseLocationNamesData = {
  locationNames: LocationName[];
  refetch: (
    options?: RefetchOptions,
  ) => Promise<QueryObserverResult<LocationName[] | undefined, Error>>;
  isLoading: boolean;
  isSuccess: boolean;
};

const useLocationNamesData = (): UseLocationNamesData => {
  const {
    data: locationNames,
    refetch,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: getLocationNamesKey(),
    queryFn: getLocationNamesAPI,
  });

  return {
    locationNames: locationNames ?? [],
    refetch,
    isLoading,
    isSuccess,
  };
};

export { useLocationNamesData };
