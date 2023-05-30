import { connect } from 'react-redux'
import { setTheme } from '../../actions/setTheme'

import AppHeader from '../../components/header/app-header'

const mapDispatchToProps = dispatch => {
  return {
    setTheme: (theme) => {
      dispatch(setTheme(theme))
    },
  }
}

const mapStateToProps = state => {
  return {
    currentTheme: state.setTheme.theme,
    sidebarVisible: state.sidebarVisible,
    isAuthed: state.isAuthed,
  }
}

export default connect(mapStateToProps, mapDispatchToProps, undefined, { pure: false })(AppHeader)
