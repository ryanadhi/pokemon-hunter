/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPokemonDetail } from '../stores/actions/pokemon';
import Modal from '../components/Modal';
import Chart from '../components/Chart';
import { ReactComponent as PokeballIcon } from '../assets/images/pokeball-catch.svg';

export default function PokemonDetail() {
  const dispatch = useDispatch();
  const { name } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { pokemon } = useSelector(
    (state) => state.pokemon,
  );

  // TODO
  // If pokemon's name not found

  useEffect(() => {
    dispatch(getPokemonDetail(name));
  }, [name]);

  const catchPokemon = () => {
    // TODO
    // add loading??
    const random = Math.random();
    if (random > 0.5) {
      setIsSuccess(true);
      setShowModal(true);
    } else {
      setIsSuccess(false);
      setShowModal(true);
    }
  };

  return (
    <div>
      {pokemon.status !== 'loaded' ? <p>loading...</p> : (
        <div className="flex flex-wrap">
          <div className="flex flex-col w-full sm:w-1/2 justify-center items-center">
            <img src={pokemon.data.sprites.other['official-artwork'].front_default} alt={pokemon.data.name} className="object-contain" />
            <div style={{ textAlign: 'center', cursor: 'pointer' }} onClick={catchPokemon} className="flex flex-col justify-center items-center my-4">
              <StyledIcon />
              <p className="font-mono text-lg text-gray-800 text-center">Catch Pokemon!!</p>
            </div>
          </div>
          <div className="w-full sm:w-1/2">
            <p className="font-sans font-bold tracking-wider text-2xl md:text-3xl text-blue-900 text-center capitalize">
              {pokemon.data.name}
            </p>
            <div className="flex justify-center flex-col">
              <p className="font-sans font-bold tracking-wider text-base md:text-xl text-blue-900 text-center capitalize">
                Types
              </p>
              <div className="flex justify-center flex-wrap">
                {
              pokemon.data.types.map((type, index) => (
                <p key={index} className="text-sm font-medium bg-green-100 py-1 px-2 rounded text-green-500 align-middle mx-2 my-4 capitalize">{type.type.name}</p>
              ))
            }
              </div>
            </div>
            <div className="flex justify-center flex-col">
              <p className="font-sans font-bold tracking-wider text-base md:text-xl text-blue-900 text-center capitalize">
                Moves
              </p>
              <div className="flex justify-center flex-wrap">
                {
              pokemon.data.moves.map((move, index) => (
                <p key={index} className="text-sm font-medium bg-gray-400 py-1 px-2 rounded text-gray-600 align-middle mx-1 my-1">{move.move.name}</p>
              ))
            }
              </div>
            </div>
            {/* <div>
              {pokemon.data.stats.map((item, index) => (
                <p key={index} className="text-sm font-medium bg-green-100 py-1 px-2 rounded text-green-500 align-middle mx-2 my-4 capitalize">
                  {item.stat.name}
                  :
                  {item.base_stat}
                </p>
              ))}
              <Chart />
            </div> */}

          </div>
        </div>
      )}
      {
        showModal
        && (
        <Modal
          catchSuccess={isSuccess}
          // show={showModal}
          set={setShowModal}
          pokemon={pokemon.data}
        />
        )
      }
    </div>
  );
}

const StyledIcon = styled(PokeballIcon)`
width: 64px;
height: 64px;
`;
