import { takeEvery, call, put, all } from 'redux-saga/effects'
import { getDataFailureAction, getDataSuccessAction, sortDataAction } from './actions'
import { getData } from './service'

function* handleGetDataAction() {
  try {
    const data = yield call(getData)
    yield put(getDataSuccessAction(data))
    yield put(sortDataAction())
  } catch {
    yield put(getDataFailureAction())
  }
}

function* watchGetDataAction() {
  yield takeEvery('GET_DATA', handleGetDataAction)
}

function* handleSortingActions() {
  yield put(sortDataAction())
}

function* watchSortingActions() {
  yield takeEvery('SET_SORTING', handleSortingActions)
  yield takeEvery('RESET_SORTING', handleSortingActions)
}

export default function* superTableSaga() {
  yield all([
    watchGetDataAction(),
    watchSortingActions()
  ])
}
