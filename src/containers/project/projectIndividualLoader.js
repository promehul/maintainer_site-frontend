import { connect } from 'react-redux'

import ProjectDetailView from '../../components/projects/project-detail-view'

const mapStateToProps = state => {
  return {
    isAuthed: state.isAuthed,
  }
}

export default connect(mapStateToProps)(ProjectDetailView)
