import { fork, all } from 'redux-saga/effects';

import appSagas from './containers/App/sagas';

const sagas = [
  appSagas,
];

function* globalSagas() {
  const globalSagasForks = sagas.map((saga) => fork(saga));

  yield all([...globalSagasForks]);
}

export default globalSagas;