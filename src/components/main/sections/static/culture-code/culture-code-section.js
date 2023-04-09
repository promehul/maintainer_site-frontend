import React from 'react'
import { Grid, Container, Icon,Header, Responsive } from 'semantic-ui-react'
import styles from '../../../../../css/sections/static/culture-code/culture-code-section.css'

const CultureCodeSection = () =>{
    return (
    <div styleName="styles.container">
        <Container styleName="styles.sub-container" padded="vertically">
            <Responsive minWidth={1000}>
            <h4 styleName="styles.heading" >Our Culture code</h4>
            <Grid columns={2} >
                <Grid.Row verticalAlign='top'>
                    <Grid.Column>
                    <div styleName="styles.content">
                        <span styleName="styles.icons1 styles.icons">
                        <Icon name="handshake" color="violet" size='big'></Icon>
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
                    <Grid.Column >
                    <div styleName="styles.content">
                        <span styleName="styles.icons4 styles.icons">
                        <Icon name="star" color="yellow" size='big'></Icon>
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
                    <Grid.Column>
                    <div styleName="styles.content">
                        <span styleName="styles.icons2 styles.icons">
                        <Icon name="handshake" color="pink" size="big"></Icon>
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
                    <Grid.Column>
                    <div styleName="styles.content">
                        <span styleName="styles.icons5 styles.icons">
                        <Icon name="ban" color="green" size='big'></Icon>
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
                    <Grid.Column>
                    <div styleName="styles.content">
                        <span styleName="styles.icons3 styles.icons">
                        <Icon name="book" color="orange" size='big'></Icon>
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
                    <Grid.Column>
                    <div styleName="styles.content">
                        <span styleName="styles.icons6 styles.icons">
                        <Icon name="bath" color="blue" size='big'></Icon>
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
                        <span styleName="styles.icons1 styles.icons">
                        <Icon name="handshake" color="violet" size='big'></Icon>
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
                        <span styleName="styles.icons4 styles.icons">
                        <Icon name="star" color="yellow" size='big'></Icon>
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
                        <span styleName="styles.icons2 styles.icons">
                        <Icon name="handshake" color="pink" size="big"></Icon>
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
                        <span styleName="styles.icons5 styles.icons">
                        <Icon name="ban" color="green" size='big'></Icon>
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
                        <span styleName="styles.icons3 styles.icons">
                        <Icon name="book" color="orange" size='big'></Icon>
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
                        <span styleName="styles.icons6 styles.icons">
                        <Icon name="bath" color="blue" size='big'></Icon>
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

export default CultureCodeSection