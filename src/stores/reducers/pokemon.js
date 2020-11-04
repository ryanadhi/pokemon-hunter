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
    case types.ADD_POKEMON: {
      let id = 0;
      const dataLength = state.myPokemon.data.length;
      if (dataLength === 0) {
        id = 1;
      } else {
        id = state.myPokemon.data[state.myPokemon.data.length - 1].id + 1;
      }
      return {
        ...state,
        myPokemon: {
          data: state.myPokemon.data.concat({
            id,
            ...action.payload,
          }),
        },
      };
    }
    case types.RELEASE_POKEMON:
      return {
        ...state,
        myPokemon: {
          data: state.myPokemon.data.filter((el) => el.id !== action.payload),
        },
      };
      // TODO
      // Release ALL
    default:
      return state;
  }
}
