/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getPokemons } from '../stores/actions/pokemon';

export default function PokemonList() {
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const dispatch = useDispatch();
  const history = useHistory();
  const { pokemons, myPokemon } = useSelector(
    (state) => state.pokemon,
  );

  useEffect(() => {
    dispatch(getPokemons(offset, limit));
  }, [offset, limit]);

  const countPokemonOwned = (name) => {
    const samePokemonOwned = myPokemon.data.filter((el) => el.name === name);
    if (samePokemonOwned.length === 0) {
      return '';
    }
    return `(${samePokemonOwned.length})`;
  };

  const nextButton = () => {
    setOffset(offset + limit);
  };
  const prevButton = () => {
    setOffset(offset - limit);
  };
  const goToDetail = (name) => {
    history.push(`/pokemon/${name}`);
  };

  const buttonActive = 'bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r';
  const buttonInActive = 'bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l opacity-50 cursor-not-allowed';

  return (
    <>
      <div className="container mx-auto">
        <div className="flex-1 justify-center">
          <div className="flex flex-col bg-gray-200">
            {
              pokemons.status === 'loading' && [...Array(limit)].map(() => (
                <div className="text-gray-700 text-center bg-gray-400 px-4 py-2 m-2 capitalize">loading...</div>
              ))
            }
            {pokemons.status === 'loaded' && pokemons.data.results.map((pokemon) => (
              <div onClick={() => goToDetail(pokemon.name)} className="text-gray-700 text-center bg-gray-400 px-4 py-2 m-2 capitalize">
                {`${pokemon.name} ${countPokemonOwned(pokemon.name)}`}
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-between my-4">
          <button disabled={!pokemons.data.previous} onClick={prevButton} type="button" className={pokemons.data.previous ? buttonActive : buttonInActive}>prev</button>
          <button onClick={nextButton} disabled={!pokemons.data.next} type="button" className={pokemons.data.next ? buttonActive : buttonInActive}>next</button>
        </div>
      </div>
    </>
  );
}
