/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import {
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import NavBar from './components/NavBar';
import PokemonList from './pages/PokemonList';
import MyPokemon from './pages/MyPokemon';
import PokemonDetail from './pages/PokemonDetail';

import { getLocalPokemons } from './stores/actions/pokemon';

function App() {
  const dispatch = useDispatch();
  const { myPokemon } = useSelector(
    (state) => state.pokemon,
  );

  useEffect(() => {
    dispatch(getLocalPokemons());
  }, []);
  return (
    <>
      <NavBar pokemonOwner={myPokemon.data.length} />
      <Switch>
        <Route path="/pokemon/:name">
          <PokemonDetail />
        </Route>
        <Route path="/my-pokemon">
          <MyPokemon />
        </Route>
        <Route path="/">
          <PokemonList />
        </Route>
      </Switch>
    </>
  );
}
export default App;
