import { TOGGLE_SIDEBAR, NAV_MOBILE_TITLE } from '../actions/sidebarClick'
import {
  urlAppBase,
  urlAppBlog,
  urlAppProjects,
  urlAppTeam,
  urlAppAlumni,
  urlAppAddMemberDetails,
  urlAppAddProjectDetails,
} from '../urls'

const sidebarVisible = (
  state = { visible: false, style: 'sidebar-container', name: '' },
  action
) => {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return {
        ...state,
        visible: action.visible,
        style: action.style,
      }
    case NAV_MOBILE_TITLE:
      return {
        ...state,
        name: action.name,
      }
    default:
      let name = action.name

      if (window.location.pathname === `${urlAppBase()}/`) {
        name = ''
      } else if (window.location.pathname === `${urlAppBlog()}/`) {
        name = 'blog'
      } else if (window.location.pathname === `${urlAppProjects()}/`) {
        name = 'projects'
      } else if (window.location.pathname === `${urlAppTeam()}/`) {
        name = 'team'
      } else if (window.location.pathname === `${urlAppAlumni()}/`) {
        name = 'alumni'
      } else if (
        window.location.pathname === `${urlAppAddMemberDetails()}/`
      ) {
        name = 'add member details'
      } else if (
        window.location.pathname === `${urlAppAddProjectDetails()}/`
      ) {
        name = 'add project details'
      }

      return {
        ...state,
        name: name,
      }
  }
}

export default sidebarVisible
