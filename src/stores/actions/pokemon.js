/* eslint-disable no-new */
import * as types from '../types';

import {
  fetchPokemons,
  fetchPokemonDetail,
} from '../../helpers/api/pokemon.api';

// GET all pokemons
export function getPokemons(offset, limit) {
  return (dispatch) => {
    new Promise((resolve, reject) => {
      dispatch({
        type: types.GET_POKEMONS_START,
        payload: {
          status: 'loading',
        },
      });
      fetchPokemons(offset, limit)
        .then((response) => {
          const pokemons = response.data.results.map((item, index) => ({
            id: index + offset + 1,
            ...item,
          }));
          dispatch({
            type: types.GET_POKEMONS_SUCCESS,
            payload: {
              status: 'loaded',
              data: {
                ...response.data,
                results: pokemons,
              },
            },
          });
          return resolve(response.data);
        })
        .catch((error) => {
          dispatch({
            type: types.GET_POKEMONS_FAILURE,
            payload: {
              status: 'loaded',
              error,
            },
          });
          return reject(error);
        });
    });
  };
}

// GET pokemon detail
export function getPokemonDetail(name) {
  return (dispatch) => {
    new Promise((resolve, reject) => {
      dispatch({
        type: types.GET_POKEMON_START,
        payload: {
          status: 'loading',
        },
      });
      fetchPokemonDetail(name)
        .then((response) => {
          dispatch({
            type: types.GET_POKEMON_SUCCESS,
            payload: {
              status: 'loaded',
              data: response.data,
            },
          });
          return resolve(response.data);
        })
        .catch((error) => {
          dispatch({
            type: types.GET_POKEMON_FAILURE,
            payload: {
              status: 'loaded',
              error,
            },
          });
          return reject(error);
        });
    });
  };
}

// Add pokemon to 'My Pokemon'
export function addPokemon(payload) {
  return {
    type: types.ADD_POKEMON,
    payload,
  };
}

// Release pokemon from 'My Pokemon'
export function releasePokemon(payload) {
  return {
    type: types.RELEASE_POKEMON,
    payload,
  };
}

// Release all pokemon from 'My Pokemon'
export function releaseAllPokemon(payload) {
  return {
    type: types.RELEASE_ALL_POKEMON,
    payload,
  };
}

// GET all of 'My Pokemon' from local storage
export function getLocalPokemons() {
  return {
    type: types.GET_LOCAL_POKEMONS,
  };
}
