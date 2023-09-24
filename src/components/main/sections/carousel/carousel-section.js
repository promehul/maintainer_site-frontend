import React, { Component } from 'react'
import { Grid, Container, Icon,Header, Responsive,Image, ImageGroup } from 'semantic-ui-react'
import CarousalMenu from './carousal-section-image-card'
import VerticalCircularScroll from './carousal-section-menu'
import styles from '../../../../css/sections/carousel/carousel-section.css'
import image1 from './group-pic.png'
import image2 from './group-pic1.png'
import image3 from './group-pic2.png'
export default class CarouselSection extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            imageList: [ image1 , image2, image3, image2, image1, image3, image2, image1],
            activeImageIndex: 2,
        }
    }

    handleImageChange(index){
        this.setState({
            activeImageIndex: index,
        })
    }

    render() {
        return (
            <div styleName="styles.container">
                <Container styleName="styles.sub-container">
                    <Grid columns={2}>
                        <Grid.Column width={6}>
                    <CarousalMenu onImageChange={(index)=>{this.handleImageChange(index)}} imageList={this.state.imageList} />
                        </Grid.Column>  
                        <Grid.Column width={10} verticalAlign='middle'>
                        <Grid.Row >
                        <Image src={this.state.imageList[this.state.activeImageIndex]} fluid></Image>
                        </Grid.Row>
                        <Grid.Row textAlign='left'>
                            <div styleName="carousel-image-description">
                                <div styleName="styles.icon-column">
                                <Icon name='heart' color='red'styleName="carousel-image-icon" ></Icon>
                                <Icon name='comment outline'styleName="carousel-image-icon" ></Icon>
                                <Icon name='send'styleName="carousel-image-icon" ></Icon>
                                </div>
                                <div styleName="carousel-image-text">
                                    <p>
                                    A team that codes together, celebrates together and cares together.
                                    </p>
                                    <p>
                                    A team that makes a difference.
                                    </p>
                                </div>
                                </div>
                            
                        </Grid.Row>
                        </Grid.Column>
                    </Grid>
                </Container>
            </div>
        )
    }
}

