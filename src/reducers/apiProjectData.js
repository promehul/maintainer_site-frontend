import {
  RECEIVE_PROJECT_DATA,
  PROJECT_ERROR_OCCURED,
} from '../actions/apiProjectCall'

const apiProjectData = (
  state = { data: null, loaded: false, url: '', count: 0 },
  action
) => {
  switch (action.type) {
    case RECEIVE_PROJECT_DATA:
      return {
        ...state,
        data: action.data,
        url: action.url,
        count: Math.ceil(action.data.count / 12),
        loaded: true,
      }
    case PROJECT_ERROR_OCCURED:
      return {
        ...state,
        url: action.url,
        error: action.error,
      }
    default:
      return state
  }
}

export default apiProjectData
