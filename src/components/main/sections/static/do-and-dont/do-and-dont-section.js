import React from 'react'
import { Grid, Container, Icon, Header, Responsive } from 'semantic-ui-react'
import styles from '../../../../../css/sections/static/do-and-dont/do-and-dont-section.css'

export default class DoAndDontSection extends React.Component {
    render() {
        return (
            <div styleName="styles.container">
                <Container styleName="styles.sub-container">
                    <Responsive minWidth={900}>
                        <Grid columns={2}>
                            <Grid.Row>
                                <Grid.Column>
                                    <p>
                                    <h4 styleName="styles.heading">
                                        We Do
                                    </h4>
                                    </p>
                                </Grid.Column>
                                <Grid.Column>
                                    <h4 styleName="styles.heading">
                                        We Don't
                                    </h4>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column>
                                    <div styleName="styles.sub-heading styles.i1">
                                        <span styleName="styles.change">One</span> team, <span styleName="styles.change">One</span> family
                                        </div>
                                   
                                </Grid.Column>
                                <Grid.Column>
                                    <div styleName="styles.sub-heading">
                                        Work hard, Party harder
                                    </div>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column>
                                    <div styleName="styles.sub-heading styles.i3">
                                        Make a <span styleName="styles.change">Difference</span> Every Day
                                    </div>
                                </Grid.Column>
                                <Grid.Column>
                                    <div styleName="styles.sub-heading">
                                        Do the right thing
                                    </div>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column>
                                    <div styleName="styles.sub-heading styles.i5">
                                        Stay <span styleName="styles.change">humble</span> and <span styleName="styles.change">learn</span> together.
                                        <img src="" styleName="styles.grow-image"/>
                                    </div>
                                </Grid.Column>
                                <Grid.Column>
                                    <div styleName="styles.sub-heading">
                                        Lead by institute, driven by IITR junta
                                    </div>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column>
                                    <div styleName="styles.sub-heading">
                                        Work hard, Party harder
                                    </div>
                                </Grid.Column>
                                <Grid.Column>
                                    <div styleName="styles.sub-heading">
                                        One team, One family
                                    </div>
                                </Grid.Column>
                                <Grid.Column>
                                    <div styleName="styles.sub-heading">
                                        Do the right thing
                                    </div>
                                </Grid.Column>
                                <Grid.Column>
                                    <div styleName="styles.sub-heading">
                                        One team, One family
                                    </div>
                                </Grid.Column>
                                <Grid.Column>
                                    <div styleName="styles.sub-heading styles.i11">
                                        Lead by <span styleName="styles.change">institute</span>, driven by <span styleName="styles.change">IITR</span> junta
                                    </div>
                                </Grid.Column>
                                <Grid.Column>
                                    <div styleName="styles.sub-heading">
                                        One team, One family
                                    </div>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Responsive>
                    <Responsive maxWidth={900}>
                        <Grid>
                            <Grid.Column>
                                <Grid.Column>
                                    <Grid.Row>
                                        <h4 styleName="styles.heading">
                                            We Do
                                        </h4>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <div styleName="styles.sub-heading ">
                                            One team, One family
                                        </div>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <div styleName="styles.sub-heading">
                                            Make a Difference Every Day
                                        </div>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <div styleName="styles.sub-heading">
                                            Stay humble and learn together.
                                        </div>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <div styleName="styles.sub-heading">
                                            Work hard, Party harder
                                        </div>
                                    </Grid.Row>
                                </Grid.Column>
                                <Grid.Column>
                                    <Grid.Row>
                                        <h4 styleName="styles.heading">
                                            We Don't
                                        </h4>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <div styleName="styles.sub-heading">
                                            Work hard, Party harder
                                        </div>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <div styleName="styles.sub-heading">
                                            Do the right thing
                                        </div>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <div styleName="styles.sub-heading">
                                            Lead by institute, driven by IITR junta
                                        </div>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <div styleName="styles.sub-heading">
                                            One team, One family
                                        </div>
                                    </Grid.Row>
                                </Grid.Column>
                            </Grid.Column>
                        </Grid>
                    </Responsive>
                </Container>
            </div>
        );
    }
}
