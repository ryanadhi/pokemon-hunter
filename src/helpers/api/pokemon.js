import axiosInstance from './_instance';

export const fetchPokemons = (params) => axiosInstance({
  method: 'get',
  url: '/',
  params,
});
