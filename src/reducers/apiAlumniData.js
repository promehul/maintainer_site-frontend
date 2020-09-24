import {
  RECEIVE_ALUMNI_DATA,
  UPDATE_ALUMNI_DATA,
  ALUMNI_ERROR_OCCURED,
} from '../actions/apiAlumniCall'

const apiAlumniData = (
  state = { data: null, loaded: false, url: '', options: null },
  action
) => {
  switch (action.type) {
    case RECEIVE_ALUMNI_DATA:
      return {
        ...state,
        data: action.data,
        url: action.url,
        loaded: true,
        options: action.options,
        count: action.count,
      }
    case UPDATE_ALUMNI_DATA:
      return {
        ...state,
        data: [...state.data, ...action.data],
        options: action.options,
      }
    case ALUMNI_ERROR_OCCURED:
      return {
        ...state,
        url: action.url,
        error: action.error,
      }
    default:
      return state
  }
}

export default apiAlumniData
