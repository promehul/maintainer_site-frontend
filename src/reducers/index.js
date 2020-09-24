import { combineReducers } from 'redux'

import apiBlogData from './apiBlogData'
import apiProjectData from './apiProjectData'
import apiTeamData from './apiTeamData'
import apiAlumniData from './apiAlumniData'
import apiInfoData from './apiInfoData'
import sidebarVisible from './sidebarClick'
import isAuthed from './apiAuth'

const rootReducers = combineReducers({
  apiBlogData,
  apiProjectData,
  apiTeamData,
  apiAlumniData,
  apiInfoData,
  sidebarVisible,
  isAuthed,
})

export default rootReducers
