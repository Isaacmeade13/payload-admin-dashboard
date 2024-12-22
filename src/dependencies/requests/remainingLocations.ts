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
};
const _generateFilters = ({
  locationNameId,
  filterIds,
  maxPrice,
  minPrice,
  isSuperHost,
  isFlexible,
  activity,
  minGuestsCount,
}: getLocationsAPIProps) => {
  const filters = [];
  const ors = [];

  if (filterIds?.length) {
    ors.push({
      $or: filterIds?.split(',').map((id) => ({
        types: {
          documentId: {
            $ne: id,
          },
        },
      })),
    });
  }

  if (minGuestsCount) {
    ors.push({
      $or: [{ guests: { $lt: minGuestsCount } }],
    });
  }

  if (maxPrice || minPrice) {
    ors.push({
      $or: [
        { price: { ...(maxPrice && { $gt: maxPrice }) } },
        { price: { ...(minPrice && { $lt: minPrice }) } },
      ],
    });
  }

  if (activity) {
    ors.push({
      $or: [
        {
          activities: {
            documentId: {
              $ne: activity,
            },
          },
        },
        { activities: { $eq: [] } },
        { activities: { $null: true } },
      ],
    });
  }

  if (locationNameId) {
    ors.push({
      $or: [
        {
          location_names: {
            documentId: {
              $notContains: locationNameId,
            },
          },
        },
        { location_names: { $eq: [] } },
        { location_names: { $null: true } },
      ],
    });
  }

  if (isSuperHost === 'true') {
    filters.push({ isSuperHost: { $ne: true } });
  }

  if (isFlexible === 'true') {
    filters.push({ isFlexible: { $ne: true } });
  }

  return [filters, ors];
};

export const getRemainingLocationsAPI = async (
  props: getLocationsAPIProps,
): Promise<LocationData[] | undefined> => {
  try {
    const [filters, ors] = _generateFilters(props);

    if (!filters.length && !ors.length) {
      return [];
    }

    const params = {
      randomSort: true,
      populate: ['images', 'logo', 'types', 'location_names'],
      filters: { $and: filters, $or: ors },
      pagination: { pageSize: 100 },
    };

    const { data: res } = await axiosInstance.get('/locations', {
      params,
    });

    return res.data;
  } catch (error) {
    console.error('🚀 ~ error:', error);
    return;
  }
};
