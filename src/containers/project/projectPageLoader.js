import { connect } from 'react-redux'

import { requestProjectData } from '../../actions/apiProjectCall'
import Project from '../../components/projects/projects-page'

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

export default connect(mapStateToProps, mapDispatchToProps)(Project)
