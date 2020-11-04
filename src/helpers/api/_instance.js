import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/pokemon/',
  timeout: 60000,
  headers: {
    'content-type': 'application/json',
  },
  responseType: 'json',
});

axiosInstance.interceptors.response.use(
  (response) => ({
    ...response,
    data: response.data,
  }),
  (error) => Promise.reject(error),
);

export default axiosInstance;
