import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import getQueryClient from '@/utils/getQueryClient';
import OnboardPage from './onboardPage';
import { getFiltersKey } from '@/dependencies/cash_key';
import { getFiltersAPI } from '@/dependencies/requests/filters';

const SSROnboardPage = async () => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: getFiltersKey(),
    queryFn: getFiltersAPI,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <OnboardPage />
    </HydrationBoundary>
  );
};

export default SSROnboardPage;
