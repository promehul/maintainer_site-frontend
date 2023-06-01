import React, { Component } from 'react'
import styles from '../../../../css/life_at_img/sections/achievement.css'
import { Container, Header,Grid } from 'semantic-ui-react'


const AchievementSection=()=>{
    return(
        <div styleName="styles.container">
            <Container >
                <div styleName="styles.achievement-heading">Achievements</div>
                <div styleName="styles.card-container">
                    <div styleName="styles.achievement-card">
                        <div styleName="styles.achievement-card-heading">
                            50+
                        </div>
                        <div styleName="styles.achievement-card-text">
                            Number of GSOC selections
                        </div>
                    </div>
                    <div styleName="styles.achievement-card">
                        <div styleName="styles.achievement-card-heading">
                            7+
                        </div>
                        <div styleName="styles.achievement-card-text">
                            Number of Startups
                        </div>
                    </div>
                    <div styleName="styles.achievement-card">
                        <div styleName="styles.achievement-card-heading">
                            3+
                        </div>
                        <div styleName="styles.achievement-card-text">
                            Number of times in ICPC final
                        </div>
                    </div>
                </div>
                </Container>
        </div>
    )
}

export default AchievementSection