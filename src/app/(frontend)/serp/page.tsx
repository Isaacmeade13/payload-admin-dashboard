import { getPayload } from 'payload';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getVenuesKey } from '@/dependencies/cash_key';
import configPromise from '@payload-config';

import SerpPage from './serpPage';
import defaultOptionsReactQuery from '@/utils/reactQueryOptions';

type Where = {
  and: Array<Where | WhereField>;
  or?: Array<Where | WhereField>;
};

type WhereField = {
  [key: string]: {
    equals?: unknown;
    contains?: string;
    greater_than_equal?: number;
    less_than_equal?: number;
  };
};

type PageProps = {
  searchParams: Promise<{
    filters: string;
    locationName: string;
    'min-guests': string;
    'max-guests': string;
    'min-price': string;
    'max-price': string;
    'is-super-host': string;
    'is-flexible': string;
    activity: string;
  }>;
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
  } = await searchParams;

  const guest = `${minGuestsCount || ''}-${maxGuestsCount || ''}`;
  const price = `${minPrice || ''}-${maxPrice || ''}`;

  const payload = await getPayload({
    config: configPromise,
  });

  const queryClient = new QueryClient(defaultOptionsReactQuery);

  await queryClient.prefetchQuery({
    queryKey: getVenuesKey(
      locationNameId || '',
      filterIds || '',
      guest,
      price,
      isSuperHost || '',
      isFlexible || '',
      activity,
    ),
    queryFn: async () => {
      try {
        const where: Where = { and: [] };

        if (filterIds?.length) {
          const ids = filterIds.split(',');
          ids.forEach((id) => {
            where.and.push({ tags: { contains: id } });
          });
        }

        if (locationNameId?.length) {
          where.and.push({ locations: { contains: locationNameId } });
        }

        if (minGuestsCount) {
          where.and.push({
            maxGuestsCount: {
              greater_than_equal: parseInt(minGuestsCount, 10),
            },
          });
        }

        if (activity) {
          where.and.push({ activities: { contains: activity } });
        }

        if (isSuperHost && isSuperHost === 'true') {
          where.and.push({ isSuperHost: { equals: true } });
        }

        if (isFlexible && isFlexible === 'true') {
          where.and.push({ isFlexible: { equals: true } });
        }

        if (minPrice || maxPrice) {
          if (minPrice) {
            where.and.push({
              'price.value': { greater_than_equal: parseInt(minPrice, 10) },
            });
          }

          if (maxPrice) {
            where.and.push({
              'price.value': { less_than_equal: parseInt(maxPrice, 10) },
            });
          }
        }

        const location = await payload.find({
          collection: 'venue',
          limit: 250,
          where,
        });

        return location?.docs;
      } catch (error) {
        console.error('Error fetching locations:', error);
        throw error;
      }
    },
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <SerpPage />
    </HydrationBoundary>
  );
};

export default SSRSerpPage;
