import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getPokemons } from './stores/actions/pokemon';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPokemons());
  }, []);

  return (
    <>
      <h1>Hello world</h1>
    </>
  );
}
export default App;
