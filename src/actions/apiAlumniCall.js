import axios from 'axios'

export const RECEIVE_ALUMNI_DATA = 'RECEIVE_ALUMNI_DATA'
export const UPDATE_ALUMNI_DATA = 'UPDATE_ALUMNI_DATA'
export const ALUMNI_ERROR_OCCURED = 'ALUMNI_ERROR_OCCURED'

const requestAlumniData = (url, page, replace = false) => {
  return dispatch => {
    axios
      .all([
        axios.get(`${url}`, {
          params: {
            page: page,
          },
        }),
        axios.options(`${url}`),
      ])
      .then(
        axios.spread((memberRes, optionsRes) => {
          if (replace) {
            dispatch(receiveAlumniData(url, memberRes, optionsRes))
          } else {
            dispatch(updateInfoData(url, memberRes, optionsRes))
          }
        })
      )
      .catch(error => {
        dispatch(errorOccured(url, error))
      })
  }
}

const receiveAlumniData = (url, memberRes, optionsRes) => ({
  type: RECEIVE_ALUMNI_DATA,
  data: memberRes.data.results,
  options: optionsRes.data,
  count: memberRes.data.count,
  url,
})

const updateInfoData = (url, memberRes, optionsRes) => ({
  type: UPDATE_ALUMNI_DATA,
  data: memberRes.data.results,
  options: optionsRes.data,
  url,
})

const errorOccured = (url, error) => ({
  type: ALUMNI_ERROR_OCCURED,
  url,
  error,
})

export { requestAlumniData }
