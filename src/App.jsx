/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import {
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

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
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Pokemon List</Link>
            </li>
            <li>
              <Link to="/my-pokemon">
                {
                `My Pokemon (${myPokemon.data.length})`
              }
              </Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
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
      </div>
    </>
  );
}
export default App;
