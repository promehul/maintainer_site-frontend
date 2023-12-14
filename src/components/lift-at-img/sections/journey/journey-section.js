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
        image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fphotos%2Ffantasy-beautiful-dawn-sunset-sky-3077928%2F&psig=AOvVaw0htqqIzWAL2NouWonlJQ3N&ust=1695755222204000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCKCP2866xoEDFQAAAAAdAAAAABAE",
        text: "Explore - we can write the description of the heading with illustration illustration and second line goes like this."
    },
    {
        image: "http://localhost:61000/static/maintainer_site/life_at_img/avengers.svg",
        text: "Learn - we can write the description of the heading with illustration illustration and second line goes like this."
    },
    {
        image: "http://localhost:61000/static/maintainer_site/life_at_img/avengers.svg",
        text: "Apply - we can write the description of the heading with illustration illustration and second line goes like this."
    },
    {
        image: "http://localhost:61000/static/maintainer_site/life_at_img/avengers.svg",
        text: "Contribute - we can write the description of the heading with illustration illustration and second line goes like this."
    },
    {
        image: "http://localhost:61000/static/maintainer_site/life_at_img/avengers.svg",
        text: "Teach - we can write the description of the heading with illustration illustration and second line goes like this."
    },
    {
        image: "http://localhost:61000/static/maintainer_site/life_at_img/avengers.svg",
        text: "Manage - we can write the description of the heading with illustration illustration and second line goes like this."
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
                        <div styleName="styles.horizontal-flex-container">
                            <div styleName="styles.journey-step-container">
                            {
                                journeySteps.map((value,index)=>{
                                    return (
                                        <span 
                                        key={index} 
                                        onClick={()=>{setActiveStep(index)}} 
                                        styleName={`styles.journey-step ${index==activeStep ? 'styles.active-journey-step' : 'styles.inactive-journey-step'}`}
                                        >
                                            {value}
                                        </span>
                                    )
                                })
                            }
                            </div>
                            <div styleName="styles.vertical-slider-div">
                                <div styleName="styles.slider-div">
                                    {
                                        journeySteps.map((value,index) => {
                                            return (
                                                <div 
                                                key={index} 
                                                onClick={()=>{setActiveStep(index)}} 
                                                styleName={`styles.slider ${index==activeStep ? 'styles.active-slider' : 'styles.inactive-slider'}`}>
                                                    {index+1}
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </Grid.Column>
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