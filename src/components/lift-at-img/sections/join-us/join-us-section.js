import React, { Component } from 'react'
import styles from '../../../../css/life_at_img/sections/join_us.css'
import { Grid, Container, Icon, Header, Responsive,Image,Button } from 'semantic-ui-react'
const JoinUsSection=()=>{
    return(
        <div styleName="styles.container">
            <Container styleName="styles.sub-container">
            <div styleName="styles.joinus">
            Join Us</div>
            <Grid columns={2}>
                <Grid.Column verticalAlign='middle'>
                <Image src="http://localhost:61000/static/maintainer_site/life_at_img/avengers.svg" size="large" alt="recruitment-poster"/>
                </Grid.Column>
                <Grid.Column>
                <Grid.Row>
                <h2 styleName="styles.recruitment-text-heading">
                    Recruitment Drive 2023
                </h2>
                <p styleName="styles.recruitment-text-description">
                Recruitments will be conducted on the basis of performance in the assignments/tests followed by the personal interview. The dates for the same will be notified via our social media pages and institute emails.
                </p>
                </Grid.Row>
                <Grid.Row>
                    <div styleName="styles.follow-us-section">
                    <h4 styleName="styles.announcement-text">
                        Follow us on
                    </h4>
                    <div>
                    <img  styleName="styles.social-media-icons" src='http://localhost:61000/static/maintainer_site/life_at_img/instagram-white-icon.svg' />
                    <img  styleName="styles.social-media-icons" src='http://localhost:61000/static/maintainer_site/life_at_img/facebook-icon-white.svg' />
                    <img  styleName="styles.social-media-icons" src='http://localhost:61000/static/maintainer_site/life_at_img/youtube-icon-white.svg' />
                    </div>
                    </div>
                </Grid.Row>
                <Grid.Row>
                    <h4 styleName="styles.announcement-text">
                        Summer Assignments are out!
                    </h4>
                    <button styleName="hello-channeli-button">
                        <span styleName="hello-channeli-text">Visit Website</span>
                        <Icon name='arrow right'></Icon>
                    </button>
                </Grid.Row>
                </Grid.Column>
            </Grid>
            </Container>
        </div>
    )
}

export default JoinUsSection