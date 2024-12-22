import axiosInstance from '@/dependencies/axios';
import { FilterData } from '@/dependencies/types';

export const getFiltersAPI = async (): Promise<FilterData[] | undefined> => {
  try {
    const params = {
      pagination: { pageSize: 250 },
    };

    const { data: res } = await axiosInstance.get('/filters?populate=types', {
      params,
    });
    return res.data;
  } catch (error) {
    console.error('🚀 ~ error:', error);
    return;
  }
};
