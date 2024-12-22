import axiosInstance from '@/dependencies/axios';
import { FormOnboardData } from '@/dependencies/types';

export const submitFormOnboard = async (
  formData: FormOnboardData,
): Promise<FormOnboardData | Error> => {
  try {
    const { data: res } = await axiosInstance.post('/form-onboards', {
      data: formData,
    });
    return res.data;
  } catch (error) {
    console.error('🚀 ~ error:', error);
    throw error;
  }
};
