import { connect } from 'react-redux'

import { requestProjectData } from '../../actions/apiProjectCall'
import Project from '../../components/projects/projects-page'
import ProjectsMobileView from '../../components/projects/projects-mobile-view'

const mapStateToProps = state => {
  return {
    apiProjectData: state.apiProjectData,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    requestProjectData: url => {
      dispatch(requestProjectData(url))
    },
  }
}

const ProjectGallery = connect(
  mapStateToProps,
  mapDispatchToProps
)(Project)

const ProjectList = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectsMobileView)

export { ProjectGallery, ProjectList }
