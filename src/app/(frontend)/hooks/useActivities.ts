import { getActivitiesKey } from '@/dependencies/cash_key';
import { getActivitiesAPI } from '@/dependencies/requests/activities';
import { ActivityData } from '@/dependencies/types';
import {
  QueryObserverResult,
  RefetchOptions,
  useQuery,
} from '@tanstack/react-query';

type UseActivities = {
  activities: ActivityData[];
  refetch: (
    options?: RefetchOptions,
  ) => Promise<QueryObserverResult<ActivityData[] | undefined, Error>>;
  isLoading: boolean;
  isSuccess: boolean;
};

const useActivities = (): UseActivities => {
  const {
    data: activities,
    refetch,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: getActivitiesKey(),
    queryFn: () => getActivitiesAPI({}),
  });

  return {
    activities: activities ?? [],
    refetch,
    isLoading,
    isSuccess,
  };
};

export { useActivities };
