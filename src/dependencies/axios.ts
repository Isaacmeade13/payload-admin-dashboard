import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_V1_ENDPOINT,
  paramsSerializer: { indexes: null },
});
export default axiosInstance;
