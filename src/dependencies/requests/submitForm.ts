import axiosInstance from '@/dependencies/axios';
import { FormDataSubmit } from '@/dependencies/types';

export const submitForm = async (
  formData: FormDataSubmit,
): Promise<FormDataSubmit | Error> => {
  try {
    const { data: res } = await axiosInstance.post(
      '/venue-booking-request',
      formData,
    );

    return res.doc;
  } catch (error) {
    console.error('🚀 ~ error:', error);
    throw error;
  }
};
