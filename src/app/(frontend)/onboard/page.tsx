import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import OnboardPage from './onboardPage';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { getFiltersKey } from '@/dependencies/cash_key';
import defaultOptionsReactQuery from '@/utils/reactQueryOptions';

const SSROnboardPage = async () => {
  const queryClient = new QueryClient(defaultOptionsReactQuery);
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
