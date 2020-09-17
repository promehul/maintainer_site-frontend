import axios from 'axios'

export const RECEIVE_INFO_LOCATION_DATA = 'RECEIVE_INFO_LOCATION_DATA'
export const RECEIVE_INFO_CONTACT_DATA = 'RECEIVE_INFO_CONTACT_DATA'
export const RECEIVE_INFO_SOCIAL_DATA = 'RECEIVE_INFO_SOCIAL_DATA'
export const RECEIVE_FOOTER_DATA = 'RECEIVE_FOOTER_DATA'
export const RECEIVE_PROJECT_SECTION_DATA = 'RECEIVE_PROJECT_SECTION_DATA'

export const INFO_ERROR_OCCURED = 'INFO_ERROR_OCCURED'

const requestInfoData = (
  locationUrl,
  contactUrl,
  socialUrl,
  footerUrl,
  projectUrl
) => {
  return dispatch => {
    axios
      .all([
        axios.get(`${locationUrl}`),
        axios.get(`${contactUrl}`),
        axios.get(`${socialUrl}`),
        axios.get(`${footerUrl}`),
        axios.get(`${projectUrl}`),
      ])
      .then(
        axios.spread(
          (
            locationRes,
            contactRes,
            socialRes,
            footerRes,
            projectRes,
            error
          ) => {
            dispatch(receiveInfoLocationData(locationUrl, locationRes)),
              dispatch(receiveInfoContactData(contactUrl, contactRes)),
              dispatch(receiveInfoSocialData(socialUrl, socialRes)),
              dispatch(receiveFooterData(footerUrl, footerRes)),
              dispatch(receiveProjectData(projectUrl, projectRes)),
              dispatch(
                errorOccured(
                  error,
                  locationUrl,
                  contactUrl,
                  socialUrl,
                  footerUrl,
                  projectUrl
                )
              )
          }
        )
      )
  }
}

const receiveInfoLocationData = (locactionUrl, locationJson) => ({
  type: RECEIVE_INFO_LOCATION_DATA,
  locationData: locationJson.data,
  locactionUrl,
})

const receiveInfoSocialData = (socialUrl, socialJson) => ({
  type: RECEIVE_INFO_SOCIAL_DATA,
  socialData: socialJson.data,
  socialUrl,
})

const receiveInfoContactData = (contactUrl, contactJson) => ({
  type: RECEIVE_INFO_CONTACT_DATA,
  contactData: contactJson.data,
  contactUrl,
})

const receiveFooterData = (footerUrl, footerJson) => ({
  type: RECEIVE_FOOTER_DATA,
  footerData: footerJson.data,
  footerUrl,
})

const receiveProjectData = (projectUrl, projectJson) => ({
  type: RECEIVE_PROJECT_SECTION_DATA,
  projectData: projectJson.data,
  projectUrl,
})

const errorOccured = (
  error,
  locactionUrl,
  contactUrl,
  socialUrl,
  footerUrl,
  projectUrl
) => ({
  type: INFO_ERROR_OCCURED,
  locactionUrl,
  contactUrl,
  socialUrl,
  footerUrl,
  projectUrl,
  error,
})

export { requestInfoData }
