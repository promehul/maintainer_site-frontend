import React, { Component } from 'react'
import styles from '../../../../css/life_at_img/sections/interests.css'
import { Container } from 'semantic-ui-react'

const json =[
    {
        name: "Web Development",
        text: "Building a better web for IITR, one line of code at a time.",
        
},

]

const InterestsSection=()=>{
    return(
        <div styleName="styles.container">
            <Container styleName="styles.sub-container">
                <div styleName="styles.heading">Our interests</div>
                <div>
                    <div styleName="styles.card">
                        <div>
                            
                        </div>
                        <div>
                            Web Development
                        </div>
                        <div>
                            Building a better web for IITR, oneline of code at a time.
                        </div>
                    </div>

                </div>
            </Container>
        </div>
    )
}

export default InterestsSection