import { connect } from 'react-redux'

import AppHeader from '../../components/header/app-header'

const mapStateToProps = state => {
  return {
    sidebarVisible: state.sidebarVisible,
    isAuthed: state.isAuthed,
  }
}

export default connect(mapStateToProps)(AppHeader)
