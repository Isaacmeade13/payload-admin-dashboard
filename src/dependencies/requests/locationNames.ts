import axiosInstance from '@/dependencies/axios';
import { LocationName } from '@/dependencies/types';

type getLocationNamesAPIProps = {
  baseUrl?: string;
};

export const getLocationNamesAPI = async ({
  baseUrl = '/api',
}: getLocationNamesAPIProps): Promise<LocationName[] | undefined> => {
  try {
    const params = {
      limit: 250,
    };

    const { data: res } = await axiosInstance.get(`${baseUrl}/location`, {
      params,
    });

    return res.docs;
  } catch (error) {
    console.error('🚀 ~ error:', error);
    return;
  }
};
