import React, { useCallback, useEffect, useState } from 'react'
import { Image } from 'semantic-ui-react'
import styles from '../../../../css/sections/carousel/carousel-section.css'

const CarouselMenu = (props) => {

    const [imageList, setImageList] = useState(props.imageList)
    
    const [activeImageIndex, setActiveImageIndex] = useState(0)

    const handleImageClick = (index) => {
        setActiveImageIndex(index)
        props.onImageChange(index)
    }

    const handleMouseHover = (index) => {
        console.log(index)
        props.onImageChange(index)
    }

    const handleMouseLeave = () => {
        props.onImageChange(activeImageIndex)
    }

    // const reafactorImageListArray=(start,end)=>{
    //     let tempImageList=[]
    //     for(let i=start;i<=end;i++){
    //         tempImageList.push(imageList[start])
    //     }
    //     for(let i=0;i<start;i++){
    //         tempImageList.push(imageList[i])
    //     }
    //     setImageList(tempImageList)
    //     console.log(tempImageList)
    // }

    useEffect(()=>{
        const options={
            root: null,
            rootMargin: "0px",
            threshold: 1.0,
        }
        
        const callbackFunction=(entries)=>{
            for(let entry of entries){
                if(entry.isIntersecting){
                    console.log(entry)
                    console.log(parseInt(entry.target.id))
                    console.log(imageList.length)
                    if(entry.target.id==imageList.length-1){
                        console.log("hello")
                        console.log(entry.target.id)
                        let j = parseInt(entry.target.id)
                        // reafactorImageListArray(j-3,j)
                    }
                }
            }
        }
        const observer = new IntersectionObserver(callbackFunction, options)
        const elements = document.querySelectorAll(".carousal-image")
        for (let element of elements) {
            observer.observe(element)
        }
    },[])

    return (
        <div styleName="styles.carousel-menu"  id="carousel-menu">
            <div styleName="styles.carousel-menu-scroll">
                {imageList.map((image, index) => {
                    if (index == activeImageIndex) {
                        return (
                            <img src={image}
                                size='medium'
                                key={index}
                                onClick={() => { handleImageClick(index) }}
                                styleName="styles.carousel-menu-selected-image"
                                className='carousal-image'
                                id={index}
                            />
                        )
                    }
                    else if (index == 0 || index == imageList.length - 1) {
                        return (
                            <img src={image}
                                size='medium'
                                key={index}
                                onClick={() => { handleImageClick(index) }}
                                styleName="styles.carousel-menu-small-images"
                                className='carousal-image'
                                onMouseEnter={(e) => { handleMouseHover(e, index) }}
                                onMouseLeave={(e) => { handleMouseLeave(e) }}
                                id={index}
                            />
                        )
                    }
                    return (
                        <img src={image} size='small'
                            key={index}
                            onClick={() => { handleImageClick(index) }}
                            id={index}
                            styleName="styles.carousel-menu-images"
                            onMouseEnter={(e) => { handleMouseHover(index) }}
                            onMouseLeave={(e) => { handleMouseLeave() }}
                            className='carousal-image'
                        />
                    )

                })}
            </div>
        </div>
    );
}

export default CarouselMenu
