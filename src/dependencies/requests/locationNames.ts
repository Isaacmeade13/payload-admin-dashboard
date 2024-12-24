import axiosInstance from '@/dependencies/axios';
import { LocationName } from '@/dependencies/types';

export const getLocationNamesAPI = async (): Promise<
  LocationName[] | undefined
> => {
  try {
    const params = {
      limit: 250,
    };

    const { data: res } = await axiosInstance.get(`/location`, {
      params,
    });

    return res.docs;
  } catch (error) {
    console.error('🚀 ~ error:', error);
    return;
  }
};
