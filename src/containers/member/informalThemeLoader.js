import { connect } from 'react-redux'

import { setTheme } from '../../actions/setTheme'

import MemberIndividualView from '../../components/member-individual-view'

const mapStateToProps = state => {
    return {
        currentTheme: state.setTheme.theme,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setTheme: (theme) => {
            dispatch(setTheme(theme))
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(MemberIndividualView)
