import React, { Component, Fragment } from 'react'
import { Card, Container, Menu, Loader, Segment, Grid } from 'semantic-ui-react'

import MemberCard from './member-card'
import { urlApiTeam } from '../../urls'

import styles from '../../css/team/member-page.css'
import common from '../../css/page-common-styles.css'

class Member extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activeItem: 'team'
        }
    }
    componentDidMount() {
        const URL = urlApiTeam()
        this.props.requestTeamData(URL)
    }

    handleItemClick = (e, { name }) => {
        this.setState({ activeItem: name });
    }

    renderContent = () => {
        const { activeItem } = this.state
        const roleOptions = this.props.apiTeamData.loaded
            ? this.props.apiTeamData.options.actions.POST.maintainer.children.role
                .choices
            : []
        const designationOptions = this.props.apiTeamData.loaded
            ? this.props.apiTeamData.options.actions.POST.maintainer.children
                .designation.choices
            : []
        if (activeItem === 'team') {
            return (
                <>
                    <Card.Group itemsPerRow={4} stackable doubling>
                        {this.props.apiTeamData.data.map(info => (
                            <MemberCard
                                info={info}
                                key={info.handle}
                                roleOptions={roleOptions}
                                designationOptions={designationOptions}
                            // linkOptions={linkOptions}
                            />
                        ))}
                    </Card.Group>

                </>
            )
        }
        if (activeItem === 'alumni') {
            return <div>Alum</div>;
        }
        return null;
    }
    render() {
        const roleOptions = this.props.apiTeamData.loaded
            ? this.props.apiTeamData.options.actions.POST.maintainer.children.role
                .choices
            : []
        const designationOptions = this.props.apiTeamData.loaded
            ? this.props.apiTeamData.options.actions.POST.maintainer.children
                .designation.choices
            : []
        // const linkOptions = this.props.apiTeamData.loaded
        //   ? this.props.apiTeamData.options.actions.POST.socialInformation.child
        //       .children.links.child.children.site.choices
        //   : []

        console.log(this.state)
        const { activeItem } = this.state;

        if (this.props.apiTeamData.loaded) {
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
                                            active={activeItem === 'team'}
                                            onClick={this.handleItemClick}
                                            styleName={activeItem === 'team' ? 'styles.options styles.active' : 'styles.options styles.inactive'}
                                        />
                                        <Menu.Item
                                            name='alumni'
                                            active={activeItem === 'alumni'}
                                            onClick={this.handleItemClick}
                                            styleName={activeItem === 'alumni' ? 'styles.options styles.active' : 'styles.options styles.inactive'}
                                        />
                                    </Menu>
                                </Grid.Column>

                                <Grid.Column width={12} textAlign="center">
                                    {this.renderContent()}
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
