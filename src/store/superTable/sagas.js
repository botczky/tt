import { takeEvery, call, put, all } from 'redux-saga/effects'
import {
  getDataFailureAction,
  getDataSuccessAction,
  sortDataAction,
  filterDataAction,
  resetPageAction,
  calcMaxPageAction,
  sliceDataAction,
} from './actions'
import { getData } from './service'

function* handleGetDataAction() {
  try {
    const data = yield call(getData)
    yield put(getDataSuccessAction(data))
    yield put(sortDataAction())
    yield put(filterDataAction())
    yield put(resetPageAction())
    yield put(sliceDataAction())
    yield put(calcMaxPageAction())
  } catch {
    yield put(getDataFailureAction())
  }
}

function* watchGetDataAction() {
  yield takeEvery('GET_DATA', handleGetDataAction)
}

function* handleSortingActions() {
  yield put(sortDataAction())
  yield put(resetPageAction())
}

function* watchSortingActions() {
  yield takeEvery('SET_SORTING', handleSortingActions)
  yield takeEvery('RESET_SORTING', handleSortingActions)
}

function* handleSearchAction() {
  yield put(filterDataAction())
  yield put(resetPageAction())
  yield put(sliceDataAction())
  yield put(calcMaxPageAction())
}

function* watchSearchActions() {
  yield takeEvery('SET_SEARCH', handleSearchAction)
}

function* handlePageActions() {
  yield put(sliceDataAction())
}

function* watchPageActions() {
  yield takeEvery('SET_PAGE', handlePageActions)
  yield takeEvery('RESET_PAGE', handlePageActions)
}

export default function* superTableSaga() {
  yield all([
    watchGetDataAction(),
    watchSortingActions(),
    watchSearchActions(),
    watchPageActions(),
  ])
}
