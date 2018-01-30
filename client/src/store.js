import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import createSagaMiddleware from 'redux-saga';

import createRootReducer from './rootReducer';
import rootSagas from './rootSaga';

export const history = createHistory();
const sagaMiddleware = createSagaMiddleware();

const middlewares = [
  // Middleware for intercepting and dispatching navigation actions
  routerMiddleware(history),
  sagaMiddleware,
];

const store = createStore(
  createRootReducer(),
  applyMiddleware(...middlewares),
);

sagaMiddleware.run(rootSagas);

export default store;