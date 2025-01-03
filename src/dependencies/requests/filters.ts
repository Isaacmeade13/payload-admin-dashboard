import axiosInstance from '@/dependencies/axios';
import { TagGroupsData } from '@/dependencies/types';

export const getTagGroupsAPI = async (): Promise<
  TagGroupsData[] | undefined
> => {
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
