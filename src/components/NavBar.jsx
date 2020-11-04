/* eslint-disable react/prop-types */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import styled from 'styled-components';
import {
  Link,
} from 'react-router-dom';
import { ReactComponent as PokeballIcon } from '../assets/images/pokeball.svg';

export default function NavBar({ pokemonOwned }) {
  return (
    <nav className="bg-gray-800">
      <div className="container mx-auto">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Icon />
              </div>
              <div className="ml-10 flex items-baseline space-x-4">
                <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">Pokemon List</Link>
                <Link to="/my-pokemon" className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">{`My Pokemon (${pokemonOwned})`}</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

const Icon = styled(PokeballIcon)`
width: 24px;
height: 24px;
`;
