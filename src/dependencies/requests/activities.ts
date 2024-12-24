import axiosInstance from '@/dependencies/axios';
import { ActivityData } from '@/dependencies/types';

type getActivitiesAPIProps = {
  baseUrl?: string;
};

export const getActivitiesAPI = async ({
  baseUrl = '/api',
}: getActivitiesAPIProps): Promise<ActivityData[] | undefined> => {
  try {
    const params = {
      limit: 250,
    };

    const { data: res } = await axiosInstance.get(`${baseUrl}/activity`, {
      params,
    });
    return res.docs;
  } catch (error) {
    console.error('🚀 ~ error:', error);
    return;
  }
};
