/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getPokemons } from '../stores/actions/pokemon';

export default function PokemonList() {
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(20);
  const dispatch = useDispatch();
  const history = useHistory();
  const { pokemons } = useSelector(
    (state) => state.pokemon,
  );

  useEffect(() => {
    dispatch(getPokemons(offset, limit));
  }, [offset, limit]);

  const nextButton = () => {
    setOffset(offset + limit);
  };
  const prevButton = () => {
    setOffset(offset - limit);
  };
  const goToDetail = (name) => {
    history.push(`/pokemon/${name}`);
  };

  return (
    <>
      <div>
        <h1>this is pokemonlist</h1>
        {pokemons.status === 'loading' && <p>loading...</p>}
        {pokemons.status === 'loaded' && <p>{JSON.stringify(pokemons.data)}</p>}
        {pokemons.status === 'loaded' && pokemons.data.results.map((pokemon) => (
          <p onClick={() => goToDetail(pokemon.name)}>{pokemon.name}</p>
        ))}
      </div>
      {pokemons.data.previous && <button onClick={prevButton} type="button">prev</button>}
      {pokemons.data.next && <button onClick={nextButton} type="button">next</button>}
    </>
  );
}
