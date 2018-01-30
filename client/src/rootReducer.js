import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import appReducer from './containers/App/reducer';

const containersReducer = {
  containers: combineReducers({
    appReducer,
    // NOTE: put other app reducers here
  }),
};

const createRootReducer = () => (
  combineReducers({
    ...containersReducer,
    route: routerReducer,
  })
);

export default createRootReducer;