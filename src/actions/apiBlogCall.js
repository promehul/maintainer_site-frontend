import axios from 'axios'

export const RECEIVE_BLOG_DATA = 'RECEIVE_BLOG_DATA'
export const BLOG_ERROR_OCCURED = 'BLOG_ERROR_OCCURED'

const requestBlogData = url => {
  return dispatch => {
    axios
      .get(`${url}`)
      .then(
        response => dispatch(receiveBlogData(url, response)),
        error => dispatch(errorOccured(url, error))
      )
  }
}

const receiveBlogData = (url, json1, json2) => ({
  type: RECEIVE_BLOG_DATA,
  data: json1.data,
  url,
})

const errorOccured = (url, error) => ({
  type: BLOG_ERROR_OCCURED,
  url,
  error,
})

export { requestBlogData }
