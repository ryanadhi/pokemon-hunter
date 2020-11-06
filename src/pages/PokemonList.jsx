/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getPokemons } from '../stores/actions/pokemon';
import { ReactComponent as PokeballIcon } from '../assets/images/pokeball-1.svg';

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
    return samePokemonOwned.length;
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

  const buttonActive = 'bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4';
  const buttonInActive = 'bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 opacity-50 cursor-not-allowed';

  return (
    <div>
      <div className="flex-1 justify-center">
        <div className="p-10 flex flex-wrap items-center justify-center">
          {
              pokemons.status === 'loading' && [...Array(limit)].map(() => (
                <div className="flex-shrink-0 m-6 relative overflow-hidden bg-teal-500 rounded-lg max-w-xs shadow-lg">
                  <svg className="absolute bottom-0 left-0 mb-8" viewBox="0 0 375 283" fill="none" style={{ transform: 'scale(1.5)', opacity: '0.1' }}>
                    <rect x="159.52" y="175" width="152" height="152" rx="8" transform="rotate(-45 159.52 175)" fill="white" />
                    <rect y="107.48" width="152" height="152" rx="8" transform="rotate(-45 0 107.48)" fill="white" />
                  </svg>
                  <div className="relative pt-10 px-10 flex items-center justify-center">
                    <div className="block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3" style={{ background: 'radial-gradient(black, transparent 60%)', transform: 'rotate3d(0, 0, 1, 20deg) scale3d(1, 0.6, 1)', opacity: '0.2' }} />
                    <StyledIcon />
                  </div>
                  <div className="relative text-white px-6 pb-6 mt-6">
                    <div className="flex justify-between">
                      <p className="block font-semibold text-xl capitalize">Loading..</p>
                      <span className="block bg-white rounded-full text-teal-500 text-xs font-bold px-3 py-2 leading-none flex items-center">0</span>
                    </div>
                  </div>
                </div>
              ))
            }
          {
              pokemons.status === 'loaded' && pokemons.data.results.map((pokemon) => (
                <div
                  className="flex-shrink-0 m-6 relative overflow-hidden bg-teal-500 rounded-lg max-w-xs shadow-lg"
                  onClick={() => goToDetail(pokemon.name)}
                  style={{ cursor: 'pointer' }}
                >
                  <svg className="absolute bottom-0 left-0 mb-8" viewBox="0 0 375 283" fill="none" style={{ transform: 'scale(1.5)', opacity: '0.1' }}>
                    <rect x="159.52" y="175" width="152" height="152" rx="8" transform="rotate(-45 159.52 175)" fill="white" />
                    <rect y="107.48" width="152" height="152" rx="8" transform="rotate(-45 0 107.48)" fill="white" />
                  </svg>
                  <div className="relative pt-10 px-10 flex items-center justify-center">
                    <div className="block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3" style={{ background: 'radial-gradient(black, transparent 60%)', transform: 'rotate3d(0, 0, 1, 20deg) scale3d(1, 0.6, 1)', opacity: '0.2' }} />
                    <img className="relative w-40" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`} alt={pokemon.name} />
                  </div>
                  <div className="relative text-white px-6 pb-6 mt-6">
                    <div className="flex justify-between">
                      <p className="block font-semibold text-xl capitalize">{pokemon.name}</p>
                      {
                        countPokemonOwned(pokemon.name) > 0
                      && <span className="block bg-white rounded-full text-teal-500 text-xs font-bold px-3 py-2 leading-none flex items-center">{countPokemonOwned(pokemon.name)}</span>
                      }
                    </div>
                  </div>
                </div>
              ))
            }
        </div>
      </div>
      <div className="bg-gray-100 flex justify-between inset-x-0 bottom-0 fixed">
        <button disabled={!pokemons.data.previous} onClick={prevButton} type="button" className={pokemons.data.previous ? `${buttonActive} rounded-l-lg` : `${buttonInActive} rounded-l-lg`}>Prev</button>
        <button onClick={nextButton} disabled={!pokemons.data.next} type="button" className={pokemons.data.next ? `${buttonActive} rounded-r-lg` : `${buttonInActive} rounded-r-lg`}>Next</button>
      </div>
    </div>
  );
}

const StyledIcon = styled(PokeballIcon)`
width: 160px;
height: 160px;
`;
