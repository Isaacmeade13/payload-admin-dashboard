import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import getQueryClient from '@/utils/getQueryClient';
import { getLocationKey } from '@/dependencies/cash_key';

import PlacePage from '../placePage';
import { getLocationAPI } from '@/dependencies/requests/location';

type PageProps = {
  params: Promise<{
    documentId: string;
  }>;
};

const SSRPlacePage = async ({ params }: PageProps) => {
  const { documentId } = await params;

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: getLocationKey(documentId),
    queryFn: () => getLocationAPI({ documentId }),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <PlacePage />
    </HydrationBoundary>
  );
};

export default SSRPlacePage;
