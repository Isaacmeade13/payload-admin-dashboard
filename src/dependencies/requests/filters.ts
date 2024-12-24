import axiosInstance from '@/dependencies/axios';
import { FilterData } from '@/dependencies/types';

type getFiltersAPIProps = {
  baseUrl?: string;
};

export const getFiltersAPI = async ({
  baseUrl = '/api',
}: getFiltersAPIProps): Promise<FilterData[] | undefined> => {
  try {
    const params = {
      limit: 250,
    };

    const { data: res } = await axiosInstance.get(`${baseUrl}/tag-group`, {
      params,
    });

    return res.docs;
  } catch (error) {
    console.error('🚀 ~ error:', error);
    return;
  }
};
