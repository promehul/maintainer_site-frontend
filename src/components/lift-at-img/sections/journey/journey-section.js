import React, { Component, useState } from 'react'
import styles from '../../../../css/life_at_img/sections/journey.css'
import { Container, Grid } from 'semantic-ui-react'

const journeyStepsInitialize = [
    "Explore",
    "Learn",
    "Apply",
    "Contribute",
    "Teach",
    "Manage",
]

const JourneySection=()=>{

    const [journeySteps,setJourneySteps] = useState(journeyStepsInitialize);
    const [activeStep,setActiveStep] = useState(0);
    return(
        <div styleName="styles.container">
            <Container styleName="styles.sub-container">
                <div styleName="styles.heading">Journey at IMG</div>
                <Grid columns={2}>
                    <Grid.Column>
                        {
                            journeySteps.map((value,index)=>{
                                console.log(value);
                                    <div key={index} onClick={()=>{setActiveStep(index)}} styleName="active-journey-step">
                                        hello
                                    </div>
                                    // <div key={index} onClick={()=>{setActiveStep(index)}} styleName="journey-step">
                                    //     hello
                                    // </div>
                            })
                        }
                    </Grid.Column>
                </Grid>
            </Container>
        </div>
    )
}

export default JourneySection