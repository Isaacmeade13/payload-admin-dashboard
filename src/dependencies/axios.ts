import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/api',
  paramsSerializer: { indexes: null },
});

export default axiosInstance;
