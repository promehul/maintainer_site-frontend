import { connect } from 'react-redux'

import { requestBlogData } from '../../actions/apiBlogCall'
import Blog from '../../components/blog/blogs-page'
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

const Blogs = connect(
  mapStateToProps,
  mapDispatchToProps
)(Blog)

const BlogSectionMainPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogSection)

export { Blogs, BlogSectionMainPage }
