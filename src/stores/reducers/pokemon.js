/* eslint-disable import/prefer-default-export */
import * as types from '../types/index';

export function pokemon(state = {}, action) {
  switch (action.type) {
    case types.GET_POKEMONS_START:
    case types.GET_POKEMONS_SUCCESS:
    case types.GET_POKEMONS_FAILURE:
      return {
        ...state,
        pokemons: {
          ...state.pokemons,
          ...action.payload,
        },
      };
    default:
      return state;
  }
}
