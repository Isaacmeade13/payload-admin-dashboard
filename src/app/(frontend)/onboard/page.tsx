import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import getQueryClient from '@/utils/getQueryClient';
import OnboardPage from './onboardPage';
import { getFiltersKey } from '@/dependencies/cash_key';
import { getFiltersAPI } from '@/dependencies/requests/filters';
import { headers } from 'next/headers';
import { getHeaderDetailsSsr } from '@/utils';

const SSROnboardPage = async () => {
  const headerList = await headers();
  const { baseUrl } = getHeaderDetailsSsr(headerList);
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: getFiltersKey(),
    queryFn: () => getFiltersAPI({ baseUrl }),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <OnboardPage />
    </HydrationBoundary>
  );
};

export default SSROnboardPage;
