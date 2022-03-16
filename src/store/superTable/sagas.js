import { takeEvery, call, put } from 'redux-saga/effects'
import { getDataFailureAction, getDataSuccessAction } from './actions'
import { getData } from './service'

function* handleGetDataAction() {
  try {
    const data = yield call(getData)
    yield put(getDataSuccessAction(data))
  } catch {
    yield put(getDataFailureAction())
  }
}

function* watchGetDataAction() {
  yield takeEvery('GET_DATA', handleGetDataAction)
}

export default function* superTableSaga() {
  yield watchGetDataAction()
}
