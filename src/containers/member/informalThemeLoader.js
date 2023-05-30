import { connect } from 'react-redux'

import { setTheme } from '../../actions/setTheme'

import MemberIndividualView from '../../components/member-individual-view'
import AddMemberDetails from '../../components/team/add-member-details2.js'


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

const MemberView = connect(
    mapStateToProps,
    mapDispatchToProps,
)(MemberIndividualView)

const MemberDetails = connect(
    mapStateToProps,
    mapDispatchToProps
)(AddMemberDetails)


export { MemberView, MemberDetails }
