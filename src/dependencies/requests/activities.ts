import axiosInstance from '@/dependencies/axios';
import { ActivityData } from '@/dependencies/types';

export const getActivitiesAPI = async (): Promise<
  ActivityData[] | undefined
> => {
  try {
    const params = {
      pagination: { pageSize: 250 },
    };

    const { data: res } = await axiosInstance.get('/activities', {
      params,
    });
    return res.data;
  } catch (error) {
    console.error('🚀 ~ error:', error);
    return;
  }
};
