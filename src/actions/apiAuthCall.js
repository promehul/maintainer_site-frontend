import axios from 'axios'

export const IS_MAINTAINER = 'IS_MAINTAINER'
export const AUTH_ERROR_OCCURED = 'AUTH_ERROR_OCCURED'

export const requestMaintainerAccess = url => {
  return dispatch => {
    axios.get(`${url}`).then(
      response => dispatch(receivePermission(url, response)),
      error => dispatch(errorOccured(url, error))
    )
  }
}

const receivePermission = (url, response) => ({
  type: IS_MAINTAINER,
  auth: Boolean(response.data),
  url,
})

const errorOccured = (url, error) => ({
  type: AUTH_ERROR_OCCURED,
  auth: false,
  url,
  error,
})
