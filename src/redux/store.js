import { createStore, combineReducers } from 'redux';
import moviesReducer from './reducers';

const rootReducer = combineReducers({
  movies: moviesReducer,
  // outros reducers podem ser adicionados aqui
});

// Cria a store com o reducer combinado
const store = createStore(
  rootReducer,
  // Ative o Redux DevTools se desejar
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
