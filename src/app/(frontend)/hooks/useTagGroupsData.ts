import { getTagGroupsKey } from '@/dependencies/cash_key';
import { getTagGroupsAPI } from '@/dependencies/requests/filters';
import { TagGroupsData } from '@/dependencies/types';
import {
  QueryObserverResult,
  RefetchOptions,
  useQuery,
} from '@tanstack/react-query';

type UseTagGroupsData = {
  tagGroups: TagGroupsData[];
  refetch: (
    options?: RefetchOptions,
  ) => Promise<QueryObserverResult<TagGroupsData[] | undefined, Error>>;
  isLoading: boolean;
  isSuccess: boolean;
};

const useTagGroupsData = (): UseTagGroupsData => {
  const {
    data: tagGroups,
    refetch,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: getTagGroupsKey(),
    queryFn: getTagGroupsAPI,
  });

  return {
    tagGroups: tagGroups ?? [],
    refetch,
    isLoading,
    isSuccess,
  };
};

export { useTagGroupsData };
