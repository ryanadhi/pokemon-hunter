import http from './http';

export const fetchPokemons = (offset, limit) => {
  const url = `/?offset=${offset}&limit=${limit}`;
  return http.GET(url);
};

export const fetchPokemonDetail = (name) => {
  const url = `/${name}`;
  return http.GET(url);
};
