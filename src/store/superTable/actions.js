export const getDataAction = () => ({
  type: 'GET_DATA'
})

export const getDataFailureAction = () => ({
  type: 'GET_DATA_FAILURE'
})

export const getDataSuccessAction = (data) => ({
  type: 'GET_DATA_SUCCESS',
  payload: {
    data
  }
})
