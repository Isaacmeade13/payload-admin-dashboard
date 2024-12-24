import axios from 'axios';

const axiosInstance = axios.create({
  paramsSerializer: { indexes: null },
});

export default axiosInstance;
