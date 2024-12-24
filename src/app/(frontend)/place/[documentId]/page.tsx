import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import getQueryClient from '@/utils/getQueryClient';
import { getLocationKey } from '@/dependencies/cash_key';
import { headers } from 'next/headers';

import PlacePage from '../placePage';
import { getLocationAPI } from '@/dependencies/requests/location';
import { getHeaderDetailsSsr } from '@/utils';

type PageProps = {
  params: Promise<{
    documentId: string;
  }>;
};

const SSRPlacePage = async ({ params }: PageProps) => {
  const { documentId } = await params;

  const headerList = await headers();
  const { baseUrl } = getHeaderDetailsSsr(headerList);
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: getLocationKey(documentId),
    queryFn: () => getLocationAPI({ documentId, baseUrl }),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <PlacePage />
    </HydrationBoundary>
  );
};

export default SSRPlacePage;
