import axiosInstance from '@/dependencies/axios';
import { LocationData } from '../types';

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

type Params = { where: any[]; limit: number; draft: boolean };

export const getRemainingLocationsAPI = async ({
  locationNameId,
  filterIds,
  maxPrice,
  minPrice,
  isSuperHost,
  isFlexible,
  activity,
  minGuestsCount,
}: getLocationsAPIProps): Promise<LocationData[] | undefined> => {
  try {
    if (
      !locationNameId &&
      !filterIds &&
      !maxPrice &&
      !minPrice &&
      !isFlexible &&
      !isSuperHost &&
      !activity &&
      !minGuestsCount
    ) {
      return [];
    }

    const where: any = { and: [], or: [] };
    const params: Params = {
      where,
      limit: 100,
      draft: false,
    };

    if (locationNameId?.length) {
      where.or.push({ locations: { not_in: [locationNameId] } });
    }

    if (minGuestsCount) {
      where.or.push({
        maxGuestsCount: { less_than: minGuestsCount },
      });
    }

    if (activity) {
      where.or.push({ activities: { not_in: [activity] } });
    }

    if (isSuperHost && isSuperHost === 'true') {
      where.and.push({ isSuperHost: { equals: false } });
    }

    if (isFlexible && isFlexible === 'true') {
      where.and.push({ isFlexible: { equals: false } });
    }

    if (minPrice || maxPrice) {
      if (minPrice) {
        where.or.push({ 'price.value': { less_than: minPrice } });
      }
      if (maxPrice) {
        where.or.push({ 'price.value': { greater_than: maxPrice } });
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
