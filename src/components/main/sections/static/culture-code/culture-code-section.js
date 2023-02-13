import React from 'react'
import { Grid, Container, Icon,Header } from 'semantic-ui-react'
import styles from '../../../../../css/sections/static/culture-code/culture-code-section.css'

const CultureCodeSection = () =>{
    return (
    <div styleName="styles.container">
        <Container styleName="styles.sub-container">
            < Header styleName="styles.heading" size='huge'>Our Culture code</Header>
            <Grid columns={2}>
                <Grid.Column>
                    <div styleName="styles.content">
                        <span styleName="styles.icons1">
                        <Icon name="handshake" color="violet" ></Icon>
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
                    <div styleName="styles.content">
                        <span styleName="styles.icons2">
                        <Icon name="handshake" color="pink" ></Icon>
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
                    <div styleName="styles.content">
                        <span styleName="styles.icons3">
                        <Icon name="handshake" color="orange" ></Icon>
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
                <Grid.Column>
                    <div styleName="styles.content">
                        <span styleName="styles.icons4">
                        <Icon name="handshake" color="yellow" ></Icon>
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
                    <div styleName="styles.content">
                        <span styleName="styles.icons5">
                        <Icon name="handshake" color="green" ></Icon>
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
                    <div styleName="styles.content">
                        <span styleName="styles.icons6">
                        <Icon name="handshake" color="blue" ></Icon>
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
            </Grid>
        </Container>
    </div>
    )
}

export default CultureCodeSection