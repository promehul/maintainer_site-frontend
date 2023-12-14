import React from 'react'
import { Grid, Container, Icon, Header, Responsive } from 'semantic-ui-react'
import styles from '../../../../../css/sections/static/culture-code/culture-code-section.css'

export default class CultureCodeSection extends React.Component {

    render() {
        return (
            <div styleName="styles.container">
                <Container styleName="styles.sub-container" padded="vertically">
                    <Responsive minWidth={1000}>
                        <h4 styleName="styles.heading" >Our Culture code</h4>
                        <Grid columns={2} >
                            <Grid.Row verticalAlign='top'>
                                <Grid.Column verticalAlign='middle'>
                                    <div styleName="styles.content">
                                        <span styleName="styles.icons">
                                            <img src="http://localhost:61000/static/maintainer_site/culture-icons/handshake-icon.svg" styleName="styles.images"/>
                                        </span>
                                        <div>
                                            <div styleName="styles.sub-heading">
                                                One team, One family
                                            </div>
                                            <div styleName="styles.sub-text">
                                                we work as a team and live as a family celebrating success and facing failures together
                                            </div>
                                        </div>
                                    </div>
                                </Grid.Column>
                                <Grid.Column verticalAlign='middle'>
                                    <div styleName="styles.content">
                                        <span styleName="styles.icons">
                                        <img src="http://localhost:61000/static/maintainer_site/culture-icons/star-icon.svg" styleName="styles.images"/>
                                        </span>
                                        <div>
                                            <div styleName="styles.sub-heading">
                                                Work hard, Party harder
                                            </div>
                                            <p styleName="styles.sub-text">
                                                we work as a team and live as a family celebrating success and facing failures together
                                            </p>
                                        </div>
                                    </div>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row verticalAlign='top'>
                                <Grid.Column verticalAlign='middle'>
                                    <div styleName="styles.content">
                                        <span styleName="styles.icons">
                                        <img src="http://localhost:61000/static/maintainer_site/culture-icons/application-icon.svg" styleName="styles.images"/>
                                        </span>
                                        <div>
                                            <div styleName="styles.sub-heading">
                                                Make a Difference Every Day
                                            </div>
                                            <div styleName="styles.sub-text">
                                                we work as a team and live as a family celebrating success and facing failures together
                                            </div>
                                        </div>
                                    </div>
                                </Grid.Column>
                                <Grid.Column verticalAlign='middle'>
                                    <div styleName="styles.content">
                                        <span styleName="styles.icons">
                                        <img src="http://localhost:61000/static/maintainer_site/culture-icons/read-icon.svg" styleName="styles.images"/> 
                                        </span>
                                        <div>
                                            <div styleName="styles.sub-heading">
                                                Do the right thing
                                            </div>
                                            <div styleName="styles.sub-text">
                                                we work as a team and live as a family celebrating success and facing failures together
                                            </div>
                                        </div>
                                    </div>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row verticalAlign='top'>
                                <Grid.Column verticalAlign='middle'>
                                    <div styleName="styles.content">
                                        <span styleName="styles.icons">
                                        <img src="http://localhost:61000/static/maintainer_site/culture-icons/brainstorming-icon.svg" styleName="styles.images"/> 
                                        </span>
                                        <div>
                                            <div styleName="styles.sub-heading">
                                                Stay humble and learn together.
                                            </div>
                                            <div styleName="styles.sub-text">
                                                we work as a team and live as a family celebrating success and facing failures together
                                            </div>
                                        </div>
                                    </div>
                                </Grid.Column>
                                <Grid.Column verticalAlign='middle'>
                                    <div styleName="styles.content">
                                        <span styleName="styles.icons">
                                        <img src="http://localhost:61000/static/maintainer_site/culture-icons/bank-icon.svg" styleName="styles.images"/> 
                                        </span>
                                        <div>
                                            <div styleName="styles.sub-heading">
                                                Lead by institute, driven by IITR junta
                                            </div>
                                            <div styleName="styles.sub-text">
                                                we work as a team and live as a family celebrating success and facing failures together
                                            </div>
                                        </div>
                                    </div>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Responsive>
                    <Responsive maxWidth={1000}>
                        <Grid.Column>
                            <Grid.Row>
                                <h4 styleName="styles.heading" >Our Culture code</h4>
                            </Grid.Row>
                            <Grid.Row horizontalAlign="center" >
                                <div styleName="styles.content">
                                    <span styleName="styles.icons">
                                    <img src="http://localhost:61000/static/maintainer_site/culture-icons/handshake-icon.svg" styleName="styles.images"/> 
                                    </span>
                                    <div>
                                        <div styleName="styles.sub-heading">
                                            One team, One family
                                        </div>
                                        <div styleName="styles.sub-text">
                                            we work as a team and live as a family celebrating success and facing failures together
                                        </div>
                                    </div>
                                </div>
                            </Grid.Row>
                            <Grid.Row>
                                <div styleName="styles.content">
                                    <span styleName="styles.icons">
                                    <img src="http://localhost:61000/static/maintainer_site/culture-icons/star-icon.svg" styleName="styles.images"/> 
                                    </span>
                                    <div>
                                        <div styleName="styles.sub-heading">
                                            Work hard, Party harder
                                        </div>
                                        <p styleName="styles.sub-text">
                                            we work as a team and live as a family celebrating success and facing failures together
                                        </p>
                                    </div>
                                </div>
                            </Grid.Row>
                            <Grid.Row>
                                <div styleName="styles.content">
                                    <span styleName="styles.icons">
                                    <img src="http://localhost:61000/static/maintainer_site/culture-icons/application-icon.svg" styleName="styles.images"/> 
                                    </span>
                                    <div>
                                        <div styleName="styles.sub-heading">
                                            Make a Difference Every Day
                                        </div>
                                        <div styleName="styles.sub-text">
                                            we work as a team and live as a family celebrating success and facing failures together
                                        </div>
                                    </div>
                                </div>
                            </Grid.Row>
                            <Grid.Row>
                                <div styleName="styles.content">
                                    <span styleName="styles.icons">
                                    <img src="http://localhost:61000/static/maintainer_site/culture-icons/read-icon.svg" styleName="styles.images"/> 
                                    </span>
                                    <div>
                                        <div styleName="styles.sub-heading">
                                            Do the right thing
                                        </div>
                                        <div styleName="styles.sub-text">
                                            we work as a team and live as a family celebrating success and facing failures together
                                        </div>
                                    </div>
                                </div>
                            </Grid.Row>
                            <Grid.Row>
                                <div styleName="styles.content">
                                    <span styleName="styles.icons">
                                    <img src="http://localhost:61000/static/maintainer_site/culture-icons/brainstorming-icon.svg" styleName="styles.images"/> 
                                    </span>
                                    <div>
                                        <div styleName="styles.sub-heading">
                                            Stay humble and learn together.
                                        </div>
                                        <div styleName="styles.sub-text">
                                            we work as a team and live as a family celebrating success and facing failures together
                                        </div>
                                    </div>
                                </div>
                            </Grid.Row>
                            <Grid.Row>
                                <div styleName="styles.content">
                                    <span styleName="styles.icons">
                                    <img src="http://localhost:61000/static/maintainer_site/culture-icons/bank-icon.svg" styleName="styles.images"/> 
                                    </span>
                                    <div>
                                        <div styleName="styles.sub-heading">
                                            Lead by institute, driven by IITR junta
                                        </div>
                                        <div styleName="styles.sub-text">
                                            we work as a team and live as a family celebrating success and facing failures together
                                        </div>
                                    </div>
                                </div>
                            </Grid.Row>
                        </Grid.Column>
                    </Responsive>
                </Container>
            </div>
        )
    }
}
