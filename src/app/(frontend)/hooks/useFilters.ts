import { getFiltersKey } from '@/dependencies/cash_key';
import { getFiltersAPI } from '@/dependencies/requests/filters';
import { FilterData } from '@/dependencies/types';
import {
  QueryObserverResult,
  RefetchOptions,
  useQuery,
} from '@tanstack/react-query';

type UseFiltersData = {
  filters: FilterData[];
  refetch: (
    options?: RefetchOptions,
  ) => Promise<QueryObserverResult<FilterData[] | undefined, Error>>;
  isLoading: boolean;
  isSuccess: boolean;
};

const useFiltersData = (): UseFiltersData => {
  const {
    data: filters,
    refetch,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: getFiltersKey(),
    queryFn: () => getFiltersAPI({}),
  });

  return {
    filters: filters ?? [],
    refetch,
    isLoading,
    isSuccess,
  };
};

export { useFiltersData };
