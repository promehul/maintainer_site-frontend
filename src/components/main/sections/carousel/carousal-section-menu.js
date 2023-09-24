import React, { useEffect, useState, useRef } from 'react';
import { Image } from 'semantic-ui-react'
import styles from '../../../../css/sections/carousel/carousel-section.css'
import image1 from './group-pic.png'
import image2 from './group-pic1.png'
import image3 from './group-pic2.png'
const VerticalCircularScroll = () => {
  const scrollContainerRef = useRef(null);
  const scrollContentRef = useRef(null);
  const [contentHeight, setContentHeight] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
    const [imageList,setImageList]=React.useState([image1 , image2, image3, image2, image1, image3, image2, image1]);
  useEffect(() => {
    // Get the height of the content and container
    const contentHeight = scrollContentRef.current.offsetHeight;
    const containerHeight = scrollContainerRef.current.offsetHeight;

    setContentHeight(contentHeight);
    setContainerHeight(containerHeight);
  }, []);

  useEffect(() => {
    const circularScroll = () => {
      // Calculate the shift distance
      const shiftDistance = Date.now() / 10 % contentHeight;

      // Apply the transform to the content element
      scrollContentRef.current.style.transform = `translateY(-${shiftDistance}px)`;

      // Request the next frame for smooth animation
      requestAnimationFrame(circularScroll);
    };

    // Start the circular scrolling animation
    circularScroll();
  }, [contentHeight]);

  return (
    <div className="scroll-container" ref={scrollContainerRef}>
      <div className="scroll-content" ref={scrollContentRef}>
        {imageList.map((image,index)=>{
                  return(<img src={image}
                    size='medium'
                    key={index}
                    styleName="styles.carousel-menu-selected-image"
                    className='carousal-image'
                    id={index}
                />)
        })}

      </div>
    </div>
  );
};

export default VerticalCircularScroll;