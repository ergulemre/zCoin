import { all, fork } from 'redux-saga/effects';
import { watchGetCoin } from './coins/sagas';

const rootSaga = function* () {
  yield all([fork(watchGetCoin)]);
};

export default rootSaga;
