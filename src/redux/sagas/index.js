import { all } from 'redux-saga/effects';
import userSaga from './userSaga';
import loginSaga from './loginSaga';
import summarySaga from './summarySaga';


export default function* rootSaga() {
  yield all([
    userSaga(),
    loginSaga(),
    summarySaga(),
    // watchIncrementAsync()
  ]);
}
