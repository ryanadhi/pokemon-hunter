/* eslint-disable max-len */
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import '../assets/tooltip.css';
import { releasePokemon, releaseAllPokemon, getLocalPokemons } from '../stores/actions/pokemon';
import { ReactComponent as ReleaseIcon } from '../assets/images/logout.svg';

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
  }, []);

  return (
    <>
      <div className="w-full overflow-y-auto">
        <div className="px-10 grid grid-cols-4 gap-4 my-4">
          {myPokemon.data.length > 0
        && myPokemon.data.map((pokemon) => (
          <div
            key={pokemon.id}
            className="col-span-4 sm:col-span-4 md:col-span-2 lg:col-span-1 xl:col-span-1 flex flex-col items-center"
          >
            <div className="bg-gray-100 rounded-xl mt-5">
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.pokemon_id}.png`}
                className="h-64 rounded-md"
                alt=""
              />
            </div>
            <div className="bg-white shadow-lg rounded-xl -mt-4 w-64">
              <div className="py-5 px-5">
                <span className="font-bold text-gray-800 text-lg">{pokemon.nickname}</span>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600 font-light capitalize">
                    {pokemon.name}
                  </div>
                  <div className="tooltip">
                    <StyledIcon onClick={() => removePokemon(pokemon.id)} />
                    <span className="tooltip-text bg-red-100 py-1 px-2 rounded text-red-500">Release</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        </div>
        <div className="flex justify-center my-12">
          <button
            type="button"
            disabled={myPokemon.data.length === 0}
            onClick={() => removeAllPokemons()}
            className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2  border rounded-full"
          >
            <>
              Release All
            </>
          </button>
        </div>
      </div>
    </>
  );
}

const StyledIcon = styled(ReleaseIcon)`
width: 24px;
height: 24px;
cursor: pointer;
g {
  > path {
    fill: red
  }
}
`;
