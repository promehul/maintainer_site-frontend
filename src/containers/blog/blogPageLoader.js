import { connect } from 'react-redux'

import { requestBlogData } from '../../actions/apiBlogCall'
import BlogSection from '../../components/main/sections/blog/blog-section'
const mapStateToProps = state => {
  return {
    apiBlogData: state.apiBlogData,
    apiInfoData: state.apiInfoData,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    requestBlogData: url => {
      dispatch(requestBlogData(url))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogSection)
