import { connect } from 'react-redux'

import { requestTeamData } from '../../actions/apiTeamCall'
import { requestAlumniData } from '../../actions/apiAlumniCall'

import Member from '../../components/team/member-page'

const mapStateToProps = state => {
  return {
    apiTeamData: state.apiTeamData,
    apiAlumniData: state.apiAlumniData,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    requestTeamData: url => {
      dispatch(requestTeamData(url))
    },
    requestAlumniData: (url, page, replace) => {
      dispatch(requestAlumniData(url, page, replace))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Member)
