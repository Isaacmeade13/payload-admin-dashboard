import axiosInstance from '@/dependencies/axios';
import { ActivityData } from '@/dependencies/types';

export const getActivitiesAPI = async (): Promise<
  ActivityData[] | undefined
> => {
  try {
    const params = {
      limit: 250,
    };

    const { data: res } = await axiosInstance.get('/activity', {
      params,
    });
    return res.docs;
  } catch (error) {
    console.error('🚀 ~ error:', error);
    return;
  }
};
