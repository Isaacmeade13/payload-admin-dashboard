import HomePage from '@/app/(frontend)/home/homePage';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import getQueryClient from '@/utils/getQueryClient';
import { getFiltersKey, getLocationNamesKey } from '@/dependencies/cash_key';
import { getFiltersAPI } from '@/dependencies/requests/filters';
import { getLocationNamesAPI } from '@/dependencies/requests/locationNames';
import { headers } from 'next/headers';
import { getHeaderDetailsSsr } from '@/utils';

const SSRHomePage = async () => {
  const headerList = await headers();
  const { baseUrl } = getHeaderDetailsSsr(headerList);

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: getFiltersKey(),
    queryFn: () => getFiltersAPI({ baseUrl }),
  });

  await queryClient.prefetchQuery({
    queryKey: getLocationNamesKey(),
    queryFn: () => getLocationNamesAPI({ baseUrl }),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <HomePage />
    </HydrationBoundary>
  );
};

export default SSRHomePage;
