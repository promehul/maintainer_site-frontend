import { IS_MAINTAINER, AUTH_ERROR_OCCURED } from '../actions/apiAuthCall'

const isAuthed = (state = { auth: false, url: '', loaded: false }, action) => {
  switch (action.type) {
    case IS_MAINTAINER:
      return {
        ...state,
        auth: action.auth,
        url: action.url,
        loaded: true,
      }
    case AUTH_ERROR_OCCURED:
      return {
        ...state,
        auth: action.auth,
        url: action.url,
        error: action.error,
        loaded: true,
      }
    default:
      return state
  }
}

export default isAuthed
