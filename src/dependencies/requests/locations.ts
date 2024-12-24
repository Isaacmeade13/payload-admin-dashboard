import axiosInstance from '@/dependencies/axios';
import { LocationData } from '@/dependencies/types';

type getLocationsAPIProps = {
  locationNameId?: string | undefined | null;
  filterIds?: string | undefined | null;
  maxGuestsCount?: string | undefined | null;
  minGuestsCount?: string | undefined | null;
  maxPrice?: string | undefined | null;
  minPrice?: string | undefined | null;
  isSuperHost: string;
  isFlexible: string;
  activity: string | undefined | null;
  baseUrl?: string;
};

type Params = {
  where: { and: any[] };
  limit: number;
  draft: boolean;
};

export const getLocationsAPI = async ({
  locationNameId,
  filterIds,
  minGuestsCount,
  maxPrice,
  minPrice,
  isSuperHost,
  isFlexible,
  activity,
}: getLocationsAPIProps): Promise<LocationData[] | undefined> => {
  try {
    const where: any = { and: [] };
    const params: Params = {
      where,
      limit: 100,
      draft: false,
    };

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
        maxGuestsCount: { greater_than_equal: minGuestsCount },
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
        where.and.push({ 'price.value': { greater_than_equal: minPrice } });
      }

      if (maxPrice) {
        where.and.push({ 'price.value': { less_than_equal: maxPrice } });
      }
    }

    const { data: res } = await axiosInstance.get(`/venue`, {
      params,
    });

    return res.docs;
  } catch (error) {
    console.error('🚀 ~ error:', error);
    return;
  }
};
