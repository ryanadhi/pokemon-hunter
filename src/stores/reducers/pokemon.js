import * as types from '../types/index';

export function pokemon(state = {}, action) {
  switch (action.type) {
    case types.GET_POKEMONS_START:
    case types.GET_POKEMONS_SUCCESS:
    case types.GET_POKEMONS_FAILURE: {
      return {
        ...state,
        pokemons: {
          ...state.pokemons,
          ...action.payload,
        },
      }; }
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
      const myPokemon = state.myPokemon.data.concat({
        id,
        ...action.payload,
      });
      localStorage.setItem('myPokemon', JSON.stringify(myPokemon));
      return {
        ...state,
        myPokemon: {
          data: myPokemon,
        },
      };
    }
    case types.RELEASE_POKEMON: {
      const myPokemon = state.myPokemon.data.filter((el) => el.id !== action.payload);
      localStorage.setItem('myPokemon', JSON.stringify(myPokemon));
      return {
        ...state,
        myPokemon: {
          data: myPokemon,
        },
      };
    }
    case types.RELEASE_ALL_POKEMON: {
      localStorage.removeItem('myPokemon');
      return {
        ...state,
        myPokemon: {
          data: [],
        },
      };
    }
    case types.GET_LOCAL_POKEMONS: {
      const myPokemon = localStorage.getItem('myPokemon');
      if (JSON.parse(myPokemon) === null || JSON.parse(myPokemon).length === 0) {
        const newState = { ...state };
        return newState;
      }
      return {
        ...state,
        myPokemon: {
          data: JSON.parse(myPokemon),
        },
      };
    }
    default:
      return state;
  }
}
