import { connect } from 'react-redux'

import { toggleSidebar, navMobileTitleRender } from '../actions/sidebarClick'
import Sidebar from '../components/sidebar'

const mapStateToProps = state => {
  return {
    sidebarVisible: state.sidebarVisible,
    isAuthed: state.isAuthed,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleSidebar: (visible, style) => {
      dispatch(toggleSidebar(visible, style))
    },
    navMobileTitleRender: name => {
      dispatch(navMobileTitleRender(name))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar)
