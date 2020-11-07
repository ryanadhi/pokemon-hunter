/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable max-len */
import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { ReactComponent as CheckIcon } from '../assets/images/check.svg';
import { ReactComponent as CloseIcon } from '../assets/images/close.svg';
import { addPokemon } from '../stores/actions/pokemon';
import { useInput } from '../helpers/inputHooks.helper';

export default function Modal(props) {
  const {
    pokemon,
    set,
    catchSuccess,
  } = props;
  const dispatch = useDispatch();
  const { value, bind, reset } = useInput(pokemon.name);

  const closeModal = () => {
    set(false);
  };

  const catchPokemon = () => {
    dispatch(addPokemon({
      name: pokemon.name,
      nickname: value,
      pokemon_id: pokemon.id,
    }));
    set(false);
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75" />
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" />
        &#8203;

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className={`sm:flex ${catchSuccess ? 'sm:items-start' : 'sm:items-center'}`}>
              <div className={`mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full ${catchSuccess ? 'bg-green-100' : 'bg-red-100'} sm:mx-0 sm:h-10 sm:w-10`}>
                {catchSuccess ? <StyledCheckIcon /> : <StyledCloseIcon /> }
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                  {
                        catchSuccess ? 'You catch the pokemon!' : 'Argh.. the pokemon is running away'
                    }

                </h3>
                <div className="mt-2">
                  {
                      catchSuccess
                  && (
                  <form
                    className="w-full max-w-sm"
                    onSubmit={catchPokemon}
                  >
                    <div className="md:flex md:items-center mb-6">
                      <div className="md:w-1/2">
                        <label className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                          Set nickname
                        </label>
                      </div>
                      <div className="md:w-1/2">
                        <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" {...bind} />
                      </div>
                    </div>
                  </form>
                  )
                  }
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
              {catchSuccess
              && (
              <button
                type="submit"
                className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-green-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-green-500 focus:outline-none focus:border-green-700 focus:shadow-outline-green transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                onClick={catchPokemon}
              >
                Store
              </button>
              )}
            </span>
            <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
              <button type="button" className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5" onClick={closeModal}>
                {catchSuccess ? 'Cancel' : 'Close'}
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

const StyledCheckIcon = styled(CheckIcon)`
width: 24px;
height: 24px;
`;

const StyledCloseIcon = styled(CloseIcon)`
width: 24px;
height: 24px;
`;
