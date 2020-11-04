import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { releasePokemon, releaseAllPokemon, getLocalPokemons } from '../stores/actions/pokemon';

export default function MyPokemon() {
  const dispatch = useDispatch();

  const removePokemon = (id) => {
    dispatch(releasePokemon(id));
  };

  const removeAllPokemons = () => {
    dispatch(releaseAllPokemon());
  };

  const { myPokemon } = useSelector(
    (state) => state.pokemon,
  );
  useEffect(() => {
    dispatch(getLocalPokemons());
  }, [myPokemon]);
  return (
    <div>
      <h1>this is mypokemon</h1>
      {myPokemon.data.length > 0
        && myPokemon.data.map((pokemon) => (
          <>
            <p key={pokemon.id}>{pokemon.name}</p>
            <button type="button" onClick={() => removePokemon(pokemon.id)}>release</button>
          </>
        ))}
      <button type="button" disabled={myPokemon.data.length === 0} onClick={() => removeAllPokemons()}>release all</button>
    </div>
  );
}
