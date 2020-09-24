import axios from 'axios'

export const RECEIVE_PROJECT_DATA = 'RECEIVE_PROJECT_DATA'
export const PROJECT_ERROR_OCCURED = 'PROJECT_ERROR_OCCURED'

const requestProjectData = url => {
  return dispatch => {
    axios
      .get(`${url}`)
      .then(
        response => dispatch(receiveProjectData(url, response)),
        error => dispatch(errorOccured(url, error))
      )
  }
}

const receiveProjectData = (url, json) => ({
  type: RECEIVE_PROJECT_DATA,
  data: json.data,
  url,
})

const errorOccured = (url, error) => ({
  type: PROJECT_ERROR_OCCURED,
  url,
  error,
})

export { requestProjectData }
