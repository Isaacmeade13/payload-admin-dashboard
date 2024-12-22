import axiosInstance from '@/dependencies/axios';
import { LocationData } from '@/dependencies/types';

type getLocationAPIProps = {
  documentId: string;
};

export const getLocationAPI = async ({
  documentId,
}: getLocationAPIProps): Promise<LocationData | undefined> => {
  try {
    const params = {
      populate: [
        'images',
        'logo',
        'types',
        'cateringAndDrinks',
        'tablesAndSeating',
        'alcoholicBeverages',
        'restrooms',
        'musicAndAV',
        'allowedEvents',
        'accommodation',
        'parking',
        'event',
        'spaceIncludes',
        'locationImage',
      ],
    };
    const { data: res } = await axiosInstance.get(`/locations/${documentId}`, {
      params,
    });

    return res.data;
  } catch (error) {
    console.error('🚀 ~ error:', error);
    return;
  }
};
