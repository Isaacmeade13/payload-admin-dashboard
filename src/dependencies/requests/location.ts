import axiosInstance from '@/dependencies/axios';
import { LocationData } from '@/dependencies/types';

type getLocationAPIProps = {
  documentId: string;
  baseUrl?: string;
};

export const getLocationAPI = async ({
  documentId,
}: getLocationAPIProps): Promise<LocationData | undefined> => {
  try {
    const { data: res } = await axiosInstance.get(`/venue/${documentId}`);

    return res;
  } catch (error) {
    console.error('🚀 ~ error:', error);
    return;
  }
};
