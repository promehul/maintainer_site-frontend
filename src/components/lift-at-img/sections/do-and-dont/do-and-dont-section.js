import React, { Component, useEffect } from 'react'
import styles from '../../../../css/life_at_img/sections/do-and-dont.css'
import { Container } from 'semantic-ui-react'


const DoAndDontSection=()=>{
    const weAreJson =[
        "One team, One family",
        "Make a Difference Every Day",
        "Stay humble and learn together",
        "Word hard, Party harder",
        "Do the right thing",
        "Lead by institute, driven by IITR junta"
    ]
    
    const weAreNotJson=[
        "One team, One family",
        "Make a Difference Every Day",
        "Stay humble and learn together",
        "Word hard, Party harder",
        "Do the right thing",
        "Hello"
    ]
    const [activeOption,setActiveOption]= React.useState(0);
    const [displayJson,setDisplayJson]=React.useState(weAreJson);
    const handleClick=(value)=>{
        if(value==activeOption){}
        else{
            if(value==0){
                setDisplayJson(weAreJson)
            }else if(value==1){
                setDisplayJson(weAreNotJson)
            }
            setActiveOption(value)

        }
    }
    return(
        <div styleName="styles.container">
            <div>
                <Container>
                {activeOption==0 ? <h1 styleName="styles.heading styles.we-are-active-heading" onClick={()=>{handleClick(0)}}>
                            We Are
                            </h1>  : <h1  styleName="styles.heading styles.we-are-heading" onClick={()=>{handleClick(0)}}>
                            We Are
                            </h1>
                            }
                </Container>
            </div>
            <div styleName="styles.content">
                
                {displayJson.map((value,index)=>{
                        return(
                        <div styleName="styles.gradient-border styles.content" key={activeOption+value}>
                    <h2 styleName="styles.sub-heading styles.sub-heading-animation">
                            {value}
                    </h2>
                </div>
                        )
                    
                })}
            </div>
            <div>
                <Container>
                    <div styleName="styles.right-align">
                    {activeOption==1 ? <h1  styleName="styles.heading styles.we-are-not-active-heading" onClick={()=>{handleClick(1)}}>
                            We Aren't
                            </h1> : <h1  styleName="styles.heading styles.we-are-not-heading" onClick={()=>{handleClick(1)}}>
                            We Aren't
                            </h1>
                            }
                    </div>
                </Container>
            </div>
        </div>
    )
}

export default DoAndDontSection