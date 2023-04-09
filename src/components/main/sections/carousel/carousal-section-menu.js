import React from 'react'
import { Grid, Container, Icon,Header, Responsive,Image, ImageGroup } from 'semantic-ui-react'
import styles from '../../../../css/sections/carousel/carousel-section.css'

export default class CarousalMenu extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            imageList: this.props.imageList,
            activeImageIndex: 2,
        }
    }


    handleImageClick=(index)=>{
        this.setState({
            activeImageIndex: index
        })
        this.props.onImageChange(index)
    }

    handleMouseHover = (index)=>{
        this.props.onImageChange(index)
        
    }

    handleMouseLeave = ()=>{
        this.props.onImageChange(this.state.activeImageIndex)
    }

    render(){
        return (
        <div styleName="styles.carousel-menu" ref="carousel-menu"  id="carousel-menu">
            <div styleName="styles.carousel-menu-scroll">
        {this.state.imageList.map((image, index)=>{
            if(index == this.state.activeImageIndex){
                return(
                    <Image src={image} size='medium' key={index} ref={index} onClick={()=>{this.handleImageClick(index)}} styleName="styles.carousel-menu-images" ></Image>
                )
            }
        return(
            <Image src={image} size='small' key={index} onClick={()=>{this.handleImageClick(index)}} styleName="styles.carousel-menu-images" onMouseEnter={()=>{this.handleMouseHover(index)}} onMouseLeave={()=>{this.handleMouseLeave()}}></Image>
        )

    })}
    </div>
    </div>
        )
    }
}