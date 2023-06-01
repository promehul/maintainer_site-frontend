import React, { Component } from 'react'
import styles from '../../../../css/life_at_img/sections/do-and-dont.css'
import { Container } from 'semantic-ui-react'


const DoAndDontSection=()=>{
    const dojson =[
        "One team, One family",
        "Make a Difference Every Day",
        "Stay humble and learn together",
        "Word hard, Party harder",
        "Do the right thing",
        "Lead by institute, driven by IITR junta"
    ]
    
    const dontjson=[
        "One team, One family",
        "Make a Difference Every Day",
        "Stay humble and learn together",
        "Word hard, Party harder",
        "Do the right thing",
        "Lead by institute, driven by IITR junta"
    ]
    
    const weAreHeadingStyle= {
        background: "linear-gradient(90deg, rgba(222, 232, 255, 0.3) 0%, rgba(222, 232, 255, 0.24) 100%)",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
        fontFamily: "Archivo",
        fontStyle: "normal",
        fontWeight: 700,
        fontSize: "2.4rem",
        padding: "2rem",
    }
    
    const weAreNotHeadingStyle={
        background: "linear-gradient(90deg, rgba(222, 232, 255, 0.24) 0%, rgba(222, 232, 255, 0.3) 100%)",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
        fontFamily: "Archivo",
        fontStyle: "normal",
        fontWeight: 700,
        fontSize: "2.4rem",
        padding: "2rem",
    }
    
    const activeWeAreHeadingStyle={
        background: "linear-gradient(90deg, #DEE8FF 0%, rgba(222, 232, 255, 0.8) 100%)",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
        fontFamily: "Archivo",
        fontStyle: "normal",
        fontWeight: 700,
        fontSize: "2.4rem",
        padding: "2rem",
    }
    
    const activeWeAreNotHeadingStyle={
        background: "linear-gradient(90deg, rgba(222, 232, 255, 0.8) 0%, #DEE8FF 100%)",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
        fontFamily: "Archivo",
        fontStyle: "normal",
        fontWeight: 700,
        fontSize: "2.4rem",
        padding: "2rem",
    }
    const [activeOption,setActiveOption]= React.useState(-1);
    const handleActiveOption=(value)=>{
        console.log(value)
        let el= event.target
        if(value==activeOption){
            setActiveOption(-1);
        }else{
            setActiveOption(value);
            el.style.background="linear-gradient(90deg, rgba(222, 232, 255, 0.3) 0%, rgba(222, 232, 255, 0.24) 100%)"
        }
    }
    return(
        <div styleName="styles.container">
            <div>
                <Container>
                  <div style={activeWeAreHeadingStyle} styleName="styles.heading" onClick={()=>{handleActiveOption(0)}}>
                            We Are
                            </div> 
                </Container>
            </div>
            <div>

            </div>
            <div>
                <Container>
                    <div styleName="styles.right-align">
                    {activeOption==1 ? <div style={weAreNotHeadingStyle} styleName="styles.heading" onClick={()=>{handleActiveOption(1)}}>
                            We Aren't
                            </div> : <div style={activeWeAreNotHeadingStyle} styleName="styles.heading" onClick={()=>{handleActiveOption(1)}}>
                            We Aren't
                            </div>
                            }
                    </div>
                </Container>
            </div>
        </div>
    )
}

export default DoAndDontSection