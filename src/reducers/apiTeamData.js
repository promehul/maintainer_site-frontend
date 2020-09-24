import { RECEIVE_TEAM_DATA, TEAM_ERROR_OCCURED } from '../actions/apiTeamCall'

const apiTeamData = (
  state = { data: null, loaded: false, url: '', options: null },
  action
) => {
  switch (action.type) {
    case RECEIVE_TEAM_DATA:
      return {
        ...state,
        data: action.data,
        url: action.url,
        loaded: true,
        options: action.options,
      }
    case TEAM_ERROR_OCCURED:
      return {
        ...state,
        url: action.url,
        error: action.error,
      }
    default:
      return state
  }
}

export default apiTeamData
