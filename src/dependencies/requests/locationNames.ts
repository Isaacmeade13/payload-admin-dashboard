import axiosInstance from '@/dependencies/axios';
import { LocationName } from '@/dependencies/types';

export const getLocationNamesAPI = async (): Promise<
  LocationName[] | undefined
> => {
  try {
    const params = {
      pagination: { pageSize: 250 },
    };

    const { data: res } = await axiosInstance.get('/location-names', {
      params,
    });
    return res.data;
  } catch (error) {
    console.error('🚀 ~ error:', error);
    return;
  }
};
