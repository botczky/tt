import { getData } from './service'

export const fetchDataAction = () => async (dispatch) => {
  try {
    dispatch({
      type: 'SET_STATUS',
      payload: {
        status: 'loading'
      }
    })

    const data = await getData()

    dispatch({
      type: 'SET_DATA',
      payload: {
        data
      }
    })

    dispatch({
      type: 'SET_STATUS',
      payload: {
        status: 'success'
      }
    })
  } catch {
    dispatch({
      type: 'SET_STATUS',
      payload: {
        status: 'failure'
      }
    })
  }
}
