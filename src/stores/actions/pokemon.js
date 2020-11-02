/* eslint-disable no-new */
import * as types from '../types';

import {
  fetchPokemons,
} from '../../helpers/api/pokemon';

export function getPokemons(params = {}) {
  return (dispatch) => {
    new Promise((resolve, reject) => {
      dispatch({
        type: types.GET_POKEMONS_START,
        payload: {
          status: 'loading',
        },
      });
      fetchPokemons(params)
        .then((response) => {
          dispatch({
            type: types.GET_POKEMONS_SUCCESS,
            payload: {
              status: 'loaded',
              data: response.data,
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
