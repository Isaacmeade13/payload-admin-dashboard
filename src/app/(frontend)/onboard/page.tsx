import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import getQueryClient from '@/utils/getQueryClient';
import OnboardPage from './onboardPage';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { getFiltersKey } from '@/dependencies/cash_key';

const SSROnboardPage = async () => {
  const queryClient = getQueryClient();
  const payload = await getPayload({
    config: configPromise,
  });

  await queryClient.prefetchQuery({
    queryKey: getFiltersKey(),
    queryFn: async () => {
      const location = await payload.find({
        collection: 'tag-group',
        limit: 250,
      });
      return location?.docs;
    },
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <OnboardPage />
    </HydrationBoundary>
  );
};

export default SSROnboardPage;
