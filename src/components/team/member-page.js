import React, { Component, Fragment } from 'react'
import { Card, Container, Menu, Loader, Segment, Grid, Visibility } from 'semantic-ui-react'

import MemberCard from './member-card'
import { urlApiTeam, urlApiAlumni } from '../../urls'

import styles from '../../css/team/member-page.css'
import common from '../../css/page-common-styles.css'

class Member extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activeTab: 'team',
            alumPage: 1,
        }
    }
    componentDidMount() {
        const URL = urlApiTeam()
        this.props.requestTeamData(URL)
        const ALUMNIURL = urlApiAlumni()
        this.props.requestAlumniData(ALUMNIURL, this.state.alumPage, true)
    }

    handleUpdate = () => {
        const URL = urlApiAlumni()
        const { count } = this.props.apiAlumniData
        const { page } = this.state
        if (count > page * 12) {
            this.setState(
                {
                    page: this.state.alumPage + 1,
                },
                () => {
                    this.props.requestAlumniData(URL, this.state.alumPage, false)
                }
            )
        }
    }

    handleItemClick = (e, { name }) => {
        this.setState({ activeTab: name });
    }

    renderContent = () => {
        const { activeTab } = this.state
        const teamRoleOptions = this.props.apiTeamData.loaded
            ? this.props.apiTeamData.options.actions.POST.maintainer.children.role
                .choices
            : []
        const teamDesignationOptions = this.props.apiTeamData.loaded
            ? this.props.apiTeamData.options.actions.POST.maintainer.children
                .designation.choices
            : []
        const alumniRoleOptions = this.props.apiAlumniData.loaded
            ? this.props.apiAlumniData.options.actions.POST.maintainer.children.role
                .choices
            : []
        const alumniDesignationOptions = this.props.apiAlumniData.loaded
            ? this.props.apiAlumniData.options.actions.POST.maintainer.children
                .designation.choices
            : []

        if (activeTab === 'team') {
            return (
                <>
                    {this.props.apiTeamData.data.map(info => (
                        <MemberCard
                            info={info}
                            key={info.handle}
                            roleOptions={teamRoleOptions}
                            designationOptions={teamDesignationOptions}
                        // linkOptions={linkOptions}
                        />
                    ))}
                </>
            )
        }
        else {
            return (
                <>
                    {this.props.apiAlumniData.data.length > 0 ? (
                        <React.Fragment>
                            {this.props.apiAlumniData.data.map(info => (
                                <MemberCard
                                    info={info}
                                    key={info.handle}
                                    roleOptions={alumniRoleOptions}
                                    designationOptions={alumniDesignationOptions}
                                // linkOptions={linkOptions}
                                />
                            ))}
                        </React.Fragment>
                    ) : null
                    }
                    < Visibility once={false} onBottomVisible={this.handleUpdate} />
                </>
            );
        }
        return null;
    }
    render() {
        const teamRoleOptions = this.props.apiTeamData.loaded
            ? this.props.apiTeamData.options.actions.POST.maintainer.children.role
                .choices
            : []
        const teamDesignationOptions = this.props.apiTeamData.loaded
            ? this.props.apiTeamData.options.actions.POST.maintainer.children
                .designation.choices
            : []
        // const linkOptions = this.props.apiTeamData.loaded
        //   ? this.props.apiTeamData.options.actions.POST.socialInformation.child
        //       .children.links.child.children.site.choices
        //   : []

        console.log(this.state)
        const { activeTab } = this.state;

        if (this.props.apiTeamData.loaded && this.props.apiAlumniData.loaded) {
            return (
                <>
                    <div styleName="styles.members">
                        <Grid columns={2}>
                            <Grid.Row>
                                <Grid.Column width={3}>
                                </Grid.Column>
                                <Grid.Column width={12}>
                                    <div styleName="styles.head">
                                        <h3 styleName="styles.heading">
                                            Meet the wizards
                                        </h3>
                                        <h4 styleName="styles.subheading">
                                            These are the people that make the magic happen.
                                        </h4>
                                    </div>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column width={3} textAlign="left">
                                    <Menu vertical text
                                        style={{ position: 'fixed', height: '100vh' }}>
                                        <Menu.Item
                                            name='team'
                                            active={activeTab === 'team'}
                                            onClick={this.handleItemClick}
                                            styleName={activeTab === 'team' ? 'styles.options styles.active' : 'styles.options styles.inactive'}
                                        />
                                        <Menu.Item
                                            name='alumni'
                                            active={activeTab === 'alumni'}
                                            onClick={this.handleItemClick}
                                            styleName={activeTab === 'alumni' ? 'styles.options styles.active' : 'styles.options styles.inactive'}
                                        />
                                    </Menu>
                                </Grid.Column>

                                <Grid.Column width={12} textAlign="center">
                                    <Card.Group itemsPerRow={4} stackable doubling>
                                        {this.renderContent()}
                                    </Card.Group>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </div>
                </>
            )
        } else {
            return <Loader active size="large" />
        }
    }
}

export default Member
