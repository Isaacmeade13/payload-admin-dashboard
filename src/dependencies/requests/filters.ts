import axiosInstance from '@/dependencies/axios';
import { FilterData } from '@/dependencies/types';

export const getFiltersAPI = async (): Promise<FilterData[] | undefined> => {
  try {
    const params = {
      limit: 250,
    };

    const { data: res } = await axiosInstance.get('/tag-group', {
      params,
    });

    return res.docs;
  } catch (error) {
    console.error('🚀 ~ error:', error);
    return;
  }
};
