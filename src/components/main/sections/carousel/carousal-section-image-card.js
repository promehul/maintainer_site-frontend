import React, { useCallback, useEffect, useState,useRef } from 'react'
import { Image } from 'semantic-ui-react'
import styles from '../../../../css/sections/carousel/carousel-section.css'
import { element, number } from 'prop-types';

const CarouselMenu = (props) => {
    const scrollContainerRef = useRef(null);
    const scrollContentRef = useRef(null);
    const imageRefList = useRef([]);
    const imageRef1 = useRef(null);
    const imageRef2 = useRef(null);
    const imageRef3 = useRef(null);
    const imageRef4 = useRef(null);
    const imageRef5 = useRef(null);
    const imageRef6 = useRef(null);
    const imageRef7 = useRef(null);
    const [imageList, setImageList] = useState(props.imageList)
    
    const [activeImageIndex, setActiveImageIndex] = useState(0)

    const handleImageClick = (index) => {
        setActiveImageIndex(index)
        props.onImageChange(index)
    }

    const handleMouseHover = (index) => {
        props.onImageChange(index)
    }

    const handleMouseLeave = () => {
        props.onImageChange(activeImageIndex)
    }
  
    const carouselMenuSelectedImageStyle ={
        marginTop: "2rem" ,
        marginBottom: "1rem" ,
        width: "20rem" ,
    }
    const decideStyle=()=>{
        const containerRect = scrollContainerRef.current.getBoundingClientRect()
        let numberOfImageInViewport = 0;
        let startingIndex=0;
        let check = true;
        imageRefList.current.map((value,index)=>{
            if(!value){
                return
            }
            const imageRect = value.getBoundingClientRect()
            if(imageRect.bottom < containerRect.top || imageRect.top > containerRect.bottom){}
            else {
                if(check){
                    check=false;
                    startingIndex=index;
                }
                numberOfImageInViewport = numberOfImageInViewport+1;
            }
        })
        let widthparam= 10
        let checkparam= (10/((numberOfImageInViewport/2)-1))
        const numberOfImageInViewport1 = numberOfImageInViewport
        imageRefList.current.map((value,index)=>{
            if(!value){
                return
            }
            if(index==startingIndex){
                check=true;
            }
            if(check && numberOfImageInViewport>(numberOfImageInViewport1/2)){
                value.style.width=widthparam+"rem"
                numberOfImageInViewport--;
                widthparam+=checkparam
            }
            else if(check && numberOfImageInViewport>0){
                numberOfImageInViewport--;
                value.style.width=widthparam+"rem"
                widthparam-=checkparam
            }else{
                value.style.width="10rem"
            }
        })

    }
    const imagesListMenu = () =>{
        imageRefList.current = [] 
        const imageListMenuReturn=imageList.map((image,index)=>{
           return(
            <img src = {image}
            onMouseEnter={(e) => { handleMouseHover(index) }}
            onMouseLeave={(e) => { handleMouseLeave() }}
            onClick={() => { handleImageClick(index) }}
            styleName="styles.carousel-menu-small-images"
            ref={(element)=> {
                imageRefList.current.push(element)}}
            />
            )
        })
        console.log(imageListMenuReturn)
        return imageListMenuReturn
    }
    const handleScroll=()=>{
        decideStyle()
    }
    useEffect(()=>{
        decideStyle()
    },[])
    return (
        <div styleName="styles.carousel-menu"  id="carousel-menu" ref={scrollContainerRef} onScroll={()=>{handleScroll()}}>
            <div styleName="styles.carousel-menu-scroll" ref={scrollContentRef} onScroll={()=>{handleScroll()}}>

                {/* <img src = {imageList[0]}
                        onMouseEnter={(e) => { handleMouseHover(index) }}
                        onMouseLeave={(e) => { handleMouseLeave() }}
                        onClick={() => { handleImageClick(index) }}
                        styleName="styles.carousel-menu-small-images"
                        ref={imageRef1}
                        />
                <img src = {imageList[1]}
                        onMouseEnter={(e) => { handleMouseHover(index) }}
                        onMouseLeave={(e) => { handleMouseLeave() }}
                        onClick={() => { handleImageClick(index) }}
                        styleName="styles.carousel-menu-small-images"
                        ref={imageRef2}
                        />
                <img src = {imageList[2]}
                        onMouseEnter={(e) => { handleMouseHover(index) }}
                        onMouseLeave={(e) => { handleMouseLeave() }}
                        onClick={() => { handleImageClick(index) }}
                        styleName="styles.carousel-menu-small-images"
                        ref={imageRef3}
                        />
                <img src = {imageList[3]}
                        onMouseEnter={(e) => { handleMouseHover(index) }}
                        onMouseLeave={(e) => { handleMouseLeave() }}
                        onClick={() => { handleImageClick(index) }}
                        styleName="styles.carousel-menu-small-images"
                        ref={imageRef4}
                        />
                <img src = {imageList[4]}
                        onMouseEnter={(e) => { handleMouseHover(index) }}
                        onMouseLeave={(e) => { handleMouseLeave() }}
                        onClick={() => { handleImageClick(index) }}
                        styleName="styles.carousel-menu-small-images"
                        ref={imageRef5}
                        />
                <img src = {imageList[5]}
                        onMouseEnter={(e) => { handleMouseHover(index) }}
                        onMouseLeave={(e) => { handleMouseLeave() }}
                        onClick={() => { handleImageClick(index) }}
                        styleName="styles.carousel-menu-small-images"
                        ref={imageRef6}
                        />
                <img src = {imageList[6]}
                        onMouseEnter={(e) => { handleMouseHover(index) }}
                        onMouseLeave={(e) => { handleMouseLeave() }}
                        onClick={() => { handleImageClick(index) }}
                        styleName="styles.carousel-menu-small-images"
                        ref={imageRef7}
                        /> */}

                {imageList.map((image,index)=>{
                    return(
                    <img src = {image}
                    onMouseEnter={(e) => { handleMouseHover(index) }}
                    onMouseLeave={(e) => { handleMouseLeave() }}
                    onClick={() => { handleImageClick(index) }}
                    styleName="styles.carousel-menu-small-images"
                    ref={(element)=> {
                        const found = imageRefList.current.find((el) => el=element);
                        if(found == undefined){

                        }
                        imageRefList.current.push(element)}}
                    />
                    )
                })}
                {()=>(
                    imagesListMenu()
                    )
                }
            </div>
        </div>
    );
}

export default CarouselMenu
