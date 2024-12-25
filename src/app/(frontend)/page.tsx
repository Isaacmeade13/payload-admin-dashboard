import HomePage from '@/app/(frontend)/home/homePage';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { getFiltersKey, getLocationNamesKey } from '@/dependencies/cash_key';
import defaultOptionsReactQuery from '@/utils/reactQueryOptions';

const SSRHomePage = async () => {
  const payload = await getPayload({
    config: configPromise,
  });

  const queryClient = new QueryClient(defaultOptionsReactQuery);
  await queryClient.prefetchQuery({
    queryKey: getFiltersKey(),
    queryFn: async () => {
      const tag = await payload.find({
        collection: 'tag-group',
        limit: 250,
      });
      return tag.docs;
    },
  });

  await queryClient.prefetchQuery({
    queryKey: getLocationNamesKey(),
    queryFn: async () => {
      const location = await payload.find({
        collection: 'location',
        limit: 250,
      });
      return location?.docs;
    },
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <HomePage />
    </HydrationBoundary>
  );
};

export default SSRHomePage;
