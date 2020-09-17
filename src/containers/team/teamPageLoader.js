import { connect } from 'react-redux'

import { requestTeamData } from '../../actions/apiTeamCall'
import Team from '../../components/team/team-page'

const mapStateToProps = state => {
  return {
    apiTeamData: state.apiTeamData,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    requestTeamData: url => {
      dispatch(requestTeamData(url))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Team)
