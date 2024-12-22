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
};

type Params = {
  pagination: {
    pageSize?: number;
  };
  populate: string[];
  'filters[location_names]'?: {
    documentId: {
      $eq: string | null | undefined;
    };
  };
  'filters[activities]'?: {
    documentId: {
      $eq: string | null | undefined;
    };
  };
  filters: {
    $and?:
      | {
          types: {
            documentId: {
              $eq: string;
            };
          };
        }[]
      | undefined;
    guests: {
      $gte: string | null | undefined;
    };
    price: {
      $gte: string | null | undefined;
      $lte: string | null | undefined;
    };
    isSuperHost?: {
      $eq: string;
    };
    isFlexible?: {
      $eq: string;
    };
  };
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
    const params: Params = {
      pagination: { pageSize: 100 },
      populate: ['images', 'logo', 'types'],

      filters: {
        guests: {
          $gte: minGuestsCount,
        },
        price: {
          $gte: minPrice,
          $lte: maxPrice,
        },
      },
    };

    if (filterIds?.length) {
      params['filters']['$and'] = filterIds?.split(',').map((id) => ({
        types: {
          documentId: {
            $eq: id,
          },
        },
      }));
    }

    if (locationNameId?.length) {
      params['filters[location_names]'] = {
        documentId: {
          $eq: locationNameId,
        },
      };
    }

    if (activity) {
      params['filters[activities]'] = {
        documentId: {
          $eq: activity,
        },
      };
    }

    if (isSuperHost && isSuperHost === 'true') {
      params['filters']['isSuperHost'] = {
        $eq: isSuperHost,
      };
    }

    if (isFlexible && isFlexible === 'true') {
      params['filters']['isFlexible'] = {
        $eq: isFlexible,
      };
    }

    const { data: res } = await axiosInstance.get('/locations', {
      params,
    });

    return res.data;
  } catch (error) {
    console.error('🚀 ~ error:', error);
    return;
  }
};
