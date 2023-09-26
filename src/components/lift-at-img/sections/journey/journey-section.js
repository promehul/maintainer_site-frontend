import React, { Component, useState } from 'react'
import styles from '../../../../css/life_at_img/sections/journey.css'
import { Container, Grid,Divider,Image,Segment } from 'semantic-ui-react'

const journeyStepsInitialize = [
    "Explore",
    "Learn",
    "Apply",
    "Contribute",
    "Teach",
    "Manage",
]

const journeyStepContent=[
    {
        image: "http://localhost:61000/static/maintainer_site/life_at_img/avengers.svg",
        text: "we can write the description of the heading with illustration illustration and second line goes like this."
    },
    {
        image: "http://localhost:61000/static/maintainer_site/life_at_img/avengers.svg",
        text: "we can write the description of the heading with illustration illustration and second line goes like this."
    },
    {
        image: "http://localhost:61000/static/maintainer_site/life_at_img/avengers.svg",
        text: "we can write the description of the heading with illustration illustration and second line goes like this."
    },
    {
        image: "http://localhost:61000/static/maintainer_site/life_at_img/avengers.svg",
        text: "we can write the description of the heading with illustration illustration and second line goes like this."
    },
    {
        image: "http://localhost:61000/static/maintainer_site/life_at_img/avengers.svg",
        text: "we can write the description of the heading with illustration illustration and second line goes like this."
    },
    {
        image: "http://localhost:61000/static/maintainer_site/life_at_img/avengers.svg",
        text: "we can write the description of the heading with illustration illustration and second line goes like this."
    },
]

const JourneySection=()=>{

    const [journeySteps,setJourneySteps] = useState(journeyStepsInitialize);
    const [activeStep,setActiveStep] = useState(0);

    return(
        <div styleName="styles.container">
            <Container styleName="styles.sub-container">
                <div styleName="styles.heading">Journey at IMG</div>
                <Grid columns={2} verticalAlign='middle'>
                    <Grid.Column>
                        <div styleName="styles.journey-step-container">
                        {
                            journeySteps.map((value,index)=>{
                                console.log(value);
                                if(index==activeStep){
                                    return(
                                        <span key={index} onClick={()=>{setActiveStep(index)}} styleName="styles.journey-step styles.active-journey-step">
                                            {value}
                                        </span>
                                    )
                                }else{
                                    return(
                                        <span key={index} onClick={()=>{setActiveStep(index)}} styleName="styles.journey-step styles.inactive-journey-step">
                                            {value}
                                        </span>
                                    )
                                }
                            })
                        }
                        </div>
                    </Grid.Column>
                    <Divider vertical>And</Divider>
                    <Grid.Column>
                        <Image src={journeyStepContent[activeStep].image}></Image>
                        <div styleName="styles.journey-step-description">
                        {journeyStepContent[activeStep].text}
                        </div>
                    </Grid.Column>
                    
                </Grid>
                <Divider vertical>Or</Divider>
            </Container>
        </div>
    )
}

export default JourneySection