import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import SerpPage from './serpPage';
import getQueryClient from '@/utils/getQueryClient';
import { getLocationsKey } from '@/dependencies/cash_key';
import { getLocationsAPI } from '@/dependencies/requests/locations';

type PageProps = {
  searchParams: {
    filters: string;
    locationName: string;
    'min-guests': string;
    'max-guests': string;
    'min-price': string;
    'max-price': string;
    'is-super-host': string;
    'is-flexible': string;
    activity: string;
  };
};

const SSRSerpPage = async ({ searchParams }: PageProps) => {
  const {
    filters: filterIds,
    locationName: locationNameId,
    'min-guests': minGuestsCount,
    'max-guests': maxGuestsCount,
    'min-price': minPrice,
    'max-price': maxPrice,
    'is-super-host': isSuperHost,
    'is-flexible': isFlexible,
    activity,
  } = searchParams;

  const guest = `${minGuestsCount || ''}-${maxGuestsCount || ''}`;
  const price = `${minPrice || ''}-${maxPrice || ''}`;

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: getLocationsKey(
      locationNameId || '',
      filterIds || '',
      guest,
      price,
      isSuperHost || '',
      isFlexible || '',
      activity,
    ),
    queryFn: () =>
      getLocationsAPI({
        locationNameId,
        filterIds,
        maxGuestsCount,
        minGuestsCount,
        minPrice,
        maxPrice,
        isSuperHost,
        isFlexible,
        activity,
      }),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <SerpPage />
    </HydrationBoundary>
  );
};

export default SSRSerpPage;
