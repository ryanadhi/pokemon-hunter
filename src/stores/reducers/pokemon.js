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
    case types.GET_POKEMON_START:
    case types.GET_POKEMON_SUCCESS:
    case types.GET_POKEMON_FAILURE:
      return {
        ...state,
        pokemon: {
          ...state.pokemon,
          ...action.payload,
        },
      };
    default:
      return state;
  }
}
