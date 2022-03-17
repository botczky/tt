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

//* GET DATA

function* watchGetDataAction() {
  yield takeEvery('GET_DATA', handleGetDataAction)
}

function* handleGetDataAction() {
  try {
    const data = yield call(getData)
    yield put(getDataSuccessAction(data))
  } catch {
    yield put(getDataFailureAction())
  }
}

//* ON GET/CHANGE DATA

function* onChangeData() {
  yield takeEvery('GET_DATA_SUCCESS', handleChangeData)
  // тут потом будет реагрировать на добавление/удаление items
}

function* handleChangeData() {
  yield put(sortDataAction())
}

//* ON SORT DATA

function* onSortData() {
  yield takeEvery('SORT_DATA', handleSortData)
}

function* handleSortData() {
  yield put(filterDataAction())
}

//* ON FILTER DATA

function* onFilterData() {
  yield takeEvery('FILTER_DATA', handleFilterData)
}

function* handleFilterData() {
  yield put(calcMaxPageAction())
  yield put(resetPageAction())
}

//* SET/RESET PAGE

function* watchPageActions() {
  yield takeEvery('SET_PAGE', handlePageActions)
  yield takeEvery('RESET_PAGE', handlePageActions)
}

function* handlePageActions() {
  yield put(sliceDataAction())
}

//* SET/RESET SORTING

function* watchSortingActions() {
  yield takeEvery('SET_SORTING', handleSortingActions)
  yield takeEvery('RESET_SORTING', handleSortingActions)
}

function* handleSortingActions() {
  yield put(sortDataAction())
}

//* SET SEARCH

function* watchSearchActions() {
  yield takeEvery('SET_SEARCH', handleSearchAction)
}

function* handleSearchAction() {
  yield put(filterDataAction())
}

export default function* superTableSaga() {
  yield all([
    watchGetDataAction(),
    watchSortingActions(),
    watchSearchActions(),
    watchPageActions(),
    onChangeData(),
    onSortData(),
    onFilterData(),
  ])
}
