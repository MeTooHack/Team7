import { takeLatest } from 'redux-saga/effects';


function* exampleSaga() {
  yield console.log('exampleSaga started');
}

function* rootSaga() {
  yield takeLatest('CONSTANT', exampleSaga);
}

export default rootSaga;