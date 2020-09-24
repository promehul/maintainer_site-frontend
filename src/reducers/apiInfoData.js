import {
  RECEIVE_INFO_LOCATION_DATA,
  RECEIVE_INFO_CONTACT_DATA,
  RECEIVE_INFO_SOCIAL_DATA,
  RECEIVE_FOOTER_DATA,
  RECEIVE_PROJECT_SECTION_DATA,
  INFO_ERROR_OCCURED,
} from '../actions/apiInfoCall'

const apiInfoData = (
  state = {
    locationData: null,
    socialData: null,
    contactData: null,
    footerData: null,
    projectData: null,
    locationUrl: '',
    socialUrl: '',
    contactUrl: '',
    footerUrl: '',
    projectUrl: '',
    locationLoaded: false,
    socialLoaded: false,
    contactLoaded: false,
    footerLoaded: false,
    projectLoaded: false,
  },
  action
) => {
  switch (action.type) {
    case RECEIVE_INFO_LOCATION_DATA:
      return {
        ...state,
        locationData: action.locationData,
        locationUrl: action.locationUrl,
        locationLoaded: true,
      }
    case RECEIVE_INFO_CONTACT_DATA:
      return {
        ...state,
        contactData: action.contactData,
        contactUrl: action.contactUrl,
        contactLoaded: true,
      }
    case RECEIVE_INFO_SOCIAL_DATA:
      return {
        ...state,
        socialData: action.socialData,
        socialUrl: action.socialUrl,
        socialLoaded: true,
      }
    case RECEIVE_FOOTER_DATA:
      return {
        ...state,
        footerData: action.footerData,
        footerUrl: action.footerUrl,
        footerLoaded: true,
      }
    case RECEIVE_PROJECT_SECTION_DATA:
      return {
        ...state,
        projectData: action.projectData,
        projectUrl: action.projectUrl,
        projectLoaded: true,
      }
    case INFO_ERROR_OCCURED:
      return {
        ...state,
        error: action.error,
      }
    default:
      return state
  }
}

export default apiInfoData
