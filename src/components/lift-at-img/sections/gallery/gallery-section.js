import React, { Component } from 'react'
import styles from '../../../../css/life_at_img/sections/gallery.css'
import { Container, Image } from 'semantic-ui-react'

const GallerySection=()=>{
    return(
        <div styleName="styles.container">
            <Container styles="styles.sub-container">
            <h1 styleName="styles.heading">Happy Faces</h1>
            <Image src="http://localhost:61000/static/maintainer_site/life_at_img/gallery.svg"/>
            </Container>
            
        </div>
    )
}

export default GallerySection