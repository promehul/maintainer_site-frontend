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

    componentDidMount(){
        let options = {
            root: null,
            rootMargin: "0px",
            threshold: 1.0
        }
        const observer = new IntersectionObserver((entries) => {
            for(let entry of entries){
                if(entry.isIntersecting && entry.intersectionRatio==1){
                    console.log(entry)
                    console.log(entry.target.id)
                }else if(!(entry.isIntersecting)){
                    console.log(entry)
                    console.log(entry.target.id)
                }
                // if(entry.intersectionRatio==1){
                //     console.log(entry)
                //     console.log(entry.target.id)
                // }
            }
        },options);
        const elements = document.querySelectorAll(".carousal-image")
        console.log(elements)
        console.log(typeof elements)
        for(let element of elements){
            observer.observe(element)
        }
        
    }
    handleImageClick=(index)=>{
        this.setState({
            activeImageIndex: index
        })
        this.props.onImageChange(index)
    }

    handleMouseHover = (e,index)=>{
        this.props.onImageChange(index)
        
    }

    handleMouseLeave = (e)=>{
        this.props.onImageChange(this.state.activeImageIndex)
    }

    reRenderMenu = (start,end)=>{
        const element = document.querySelectorAll(".carousal-image")
        for(let i=0; i<element.length;i++){
            if(i==0 && i<end){

            }else{

            }
        }
    }

    render(){
        return (
        <div styleName="styles.carousel-menu" ref="carousel-menu"  id="carousel-menu">
            <div styleName="styles.carousel-menu-scroll">
        {/* {this.state.imageList.map((image, index)=>{
            if(index == this.state.activeImageIndex){
                return(
                    <img src={image} 
                    size='medium' 
                    key={index} 
                    ref={index} 
                    onClick={()=>{this.handleImageClick(index)}} 
                    styleName="styles.carousel-menu-selected-image" 
                    className='carousal-image'
                    id={index}
                    />
                )
            }
            else if(index== 0 || index== this.state.imageList.length-1){
                return(
                    <img src={image} 
                    size='medium' 
                    key={index} 
                    ref={index} 
                    onClick={()=>{this.handleImageClick(index)}} 
                    styleName="styles.carousel-menu-small-images"
                    className='carousal-image'
                    onMouseEnter={(e)=>{this.handleMouseHover(e,index)}} 
                    onMouseLeave={(e)=>{this.handleMouseLeave(e)}}
                    id={index}
                    />
                )
            }
        return(
            <img src={image} size='small' 
            key={index} 
            onClick={()=>{this.handleImageClick(index)}} 
            id={index}
            styleName="styles.carousel-menu-images" 
            onMouseEnter={(e)=>{this.handleMouseHover(e,index)}} 
            onMouseLeave={(e)=>{this.handleMouseLeave(e)}}
            className='carousal-image'
            />
        )

    })} */}
    </div>
    </div>
        )
    }
}