import HomePage from '@/app/home/homePage';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import getQueryClient from '@/utils/getQueryClient';
import { getFiltersKey, getLocationNamesKey } from '@/dependencies/cash_key';
import { getFiltersAPI } from '@/dependencies/requests/filters';
import { getLocationNamesAPI } from '@/dependencies/requests/locationNames';

const SSRHomePage = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: getFiltersKey(),
    queryFn: getFiltersAPI,
  });

  await queryClient.prefetchQuery({
    queryKey: getLocationNamesKey(),
    queryFn: getLocationNamesAPI,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <HomePage />
    </HydrationBoundary>
  );
};

export default SSRHomePage;
