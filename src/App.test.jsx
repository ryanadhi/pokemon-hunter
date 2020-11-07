/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import App from './App';

describe('With React Testing Library', () => {
  const initialState = {
    pokemon: {
      pokemons: {
        status: 'loaded',
        error: null,
        data: {
          count: 150,
          next: 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20',
          previous: null,
          results: [
            {
              id: 1,
              name: 'bulbasaur',
              url: 'https://pokeapi.co/api/v2/pokemon/1/',
            },
          ],
        },
      },
      pokemon: {
        status: 'loaded',
        error: null,
        data: {},
      },
      myPokemon: {
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
  let store;

  describe('App', () => {
    store = mockStore(initialState);
    const wrapper = render(
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>,
    );

    it('Shows Navbar', () => {
      expect(wrapper.getByText('Pokemon List')).not.toBeNull();
      expect(wrapper.getByText('My Pokemon (1)')).not.toBeNull();
      expect(wrapper.getByText('pokeball.svg')).not.toBeNull();
      expect(wrapper.getByText(/Prev/i).closest('button')).toBeDisabled();
      expect(wrapper.getByText(/Next/i).closest('button')).toBeInTheDocument();
    });
  });
});
