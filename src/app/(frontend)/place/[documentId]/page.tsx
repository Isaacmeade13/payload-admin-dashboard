import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import getQueryClient from '@/utils/getQueryClient';
import { getLocationKey } from '@/dependencies/cash_key';
import PlacePage from '../placePage';
import { getPayload } from 'payload';
import configPromise from '@payload-config';

type PageProps = {
  params: Promise<{
    documentId: string;
  }>;
};

const SSRPlacePage = async ({ params }: PageProps) => {
  const { documentId } = await params;

  const payload = await getPayload({
    config: configPromise,
  });

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: getLocationKey(documentId),
    queryFn: async () => {
      const venue = await payload.findByID({
        collection: 'venue',
        id: Number(documentId),
      });
      return venue;
    },
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <PlacePage />
    </HydrationBoundary>
  );
};

export default SSRPlacePage;
