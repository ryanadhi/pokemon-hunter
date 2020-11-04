/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/no-array-index-key */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPokemonDetail, addPokemon } from '../stores/actions/pokemon';

export default function PokemonDetail() {
  const dispatch = useDispatch();
  const { name } = useParams();
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
    console.log(random);
    if (random > 0.5) {
      dispatch(addPokemon({
        name: pokemon.data.name,
      }));
    } else {
      console.log('failed');
    }
  };

  return (
    <div>
      <p onClick={catchPokemon}>catch!!</p>
      {pokemon.status !== 'loaded' ? <p>loading...</p> : (
        <>
          <img src={pokemon.data.sprites.front_default} alt={pokemon.data.name} />
          <h1 style={{ fontWeight: 'bold' }}>{pokemon.data.name}</h1>
          <h2>==moves==</h2>
          {
        pokemon.data.moves.map((move, index) => (
          <p key={index}>{move.move.name}</p>
        ))
      }
          <h2>==types==</h2>
          {
        pokemon.data.types.map((type, index) => (
          <p key={index}>{type.type.name}</p>
        ))
      }
        </>
      )}
    </div>
  );
}
