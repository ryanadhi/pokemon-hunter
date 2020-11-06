import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducer from '../reducers';
import initialState from '../states';

export * from './pokemon';

export function initializeStore(state = initialState) {
  return createStore(
    reducer,
    state,
    composeWithDevTools(applyMiddleware(thunkMiddleware)),
  );
}
