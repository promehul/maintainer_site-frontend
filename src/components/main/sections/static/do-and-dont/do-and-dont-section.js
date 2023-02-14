import React from 'react'
import { Grid, Container, Icon,Header } from 'semantic-ui-react'
import styles from '../../../../../css/sections/static/do-and-dont/do-and-dont-section.css'

const DoAndDontSection=()=>{
    return(
        <div styleName="styles.container">
            <Container styleName="styles.sub-container">
                <Grid columns={2}>
                <Grid.Row>
                    <Grid.Column>
                        <div styleName="styles.heading">
                        We Do
                        </div>
                    </Grid.Column>
                    <Grid.Column>
                        <div styleName="styles.heading">
                        We Don't 
                        </div>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                    <div styleName="styles.sub-heading">
                            One team, One family yes we area a family if you have a doubt we don't care ;)
                        </div>
                    </Grid.Column>
                    <Grid.Column>
                    <div styleName="styles.sub-heading">
                            Work hard, Party harder then go home coz we are good kids :)
                        </div>
                    </Grid.Column>
                </Grid.Row>
                </Grid>
            </Container>
        </div>
    );
}

export default DoAndDontSection