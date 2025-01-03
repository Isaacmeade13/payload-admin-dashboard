import axiosInstance from '@/dependencies/axios';
import { VenueData } from '@/dependencies/types';

type getLocationAPIProps = {
  documentId: string;
  baseUrl?: string;
};

export const getVenueAPI = async ({
  documentId,
}: getLocationAPIProps): Promise<VenueData | undefined> => {
  try {
    const { data: res } = await axiosInstance.get(`/venue/${documentId}`);

    return res;
  } catch (error) {
    console.error('🚀 ~ error:', error);
    return;
  }
};
