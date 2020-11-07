/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import MyPokemon from '../MyPokemon';

describe('MyPokemon', () => {
  const initialState = {
    pokemon: {
      pokemons: {
        status: 'initial',
        error: null,
        data: [{
          count: 150,
          next: 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20',
          previous: null,
          results: [
            {
              name: 'bulbasaur',
              url: 'https://pokeapi.co/api/v2/pokemon/1/',
            },
          ],
        }],
      },
      pokemon: {
        status: 'initial',
        error: null,
        data: {},
      },
      myPokemon: {
        // status: 'initial',
        // error: null,
        data: [{
          id: 1,
          pokemon_id: 1,
          name: 'bulbasaur',
          nickname: 'bulbasaur-1',
        }],
      },
    },
  };
  const middlewares = [thunk];
  const mockStore = configureStore(middlewares);
  const store = mockStore(initialState);
  it('should render correctly in "debug" mode', () => {
    const wrapper = shallow(
      <BrowserRouter>
        <Provider store={store}>
          <MyPokemon debug />
        </Provider>
      </BrowserRouter>,
    );

    expect(wrapper).toMatchSnapshot();
  });
  it('should render data from my pokemon', () => {
    const wrapper = render(
      <BrowserRouter>
        <Provider store={store}>
          <MyPokemon debug />
        </Provider>
      </BrowserRouter>,
    );

    expect(wrapper.getByText('bulbasaur')).toBeInTheDocument();
    expect(wrapper.getByText('Release')).toBeInTheDocument();
    expect(wrapper.getByText(/Release All/i).closest('button')).toBeInTheDocument();
  });
});
