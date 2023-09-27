import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, Grid, Image, Segment, Sematic, Divider } from 'semantic-ui-react'

import { urlStaticBase } from '../../../../urls'
import React, { Component, Fragment } from 'react'
import { Card, Container, Segment, Icon, Loader, Grid } from 'semantic-ui-react'

import BlogDetail from '../../../blog/blog-post-card'
import { urlApiBlog } from '../../../../urls'
import { MEDIUM_URL } from '../../../../consts'
import { isMobile } from 'react-device-detect'

import styles from '../../../../css/sections/blog/blog-section.css'
import common from '../../../../css/sections/common-styles.css'

const BlogCard = (props) => {
  const [name, setName] = useState(props.name)
  const [time, setTime] = useState(props.time)
  const [description, setDescription] = useState(props.description)
  const [imgSrc, setImgSrc] = useState(props.imgSrc)
  console.log("blog")
  return (
    <span styleName="styles.blog-card" >
      <div>
        <img src={imgSrc} styleName="styles.blog-card-image" />
      </div>
      <div>
        <div>
          {name}
        </div>
        <div>
          {time}
        </div>
      </div>
      <div styleName="styles.blog-card-description">
        {description.substring(1,20)}
      </div>
    </span>
  )
}

const BlogDevelopmentSection = () => {
  const blogDetail = [
    {
      "imgSrc": "https://pcf.gallery/assets/images/jsonformat.png",
      "name": "Nikhil Nagar",
      "time": "5 min read",
      "description": "Why Underground Printing Switched from Gmail to Help Why Underground Printing Switched from Gmail to Help"
    },
    {
      "imgSrc": "https://pcf.gallery/assets/images/jsonformat.png",
      "name": "Nikhil Nagar",
      "time": "5 min read",
      "description": "Why Underground Printing Switched from Gmail to Help Why Underground Printing Switched from Gmail to Help"
    },
    {
      "imgSrc": "https://pcf.gallery/assets/images/jsonformat.png",
      "name": "Nikhil Nagar",
      "time": "5 min read",
      "description": "Why Underground Printing Switched from Gmail to Help Why Underground Printing Switched from Gmail to Help"
    },
    {
      "imgSrc": "https://pcf.gallery/assets/images/jsonformat.png",
      "name": "Nikhil Nagar",
      "time": "5 min read",
      "description": "Why Underground Printing Switched from Gmail to Help Why Underground Printing Switched from Gmail to Help"
    },
    {
      "imgSrc": "https://pcf.gallery/assets/images/jsonformat.png",
      "name": "Nikhil Nagar",
      "time": "5 min read",
      "description": "Why Underground Printing Switched from Gmail to Help Why Underground Printing Switched from Gmail to Help"
    },
    {
      "imgSrc": "https://pcf.gallery/assets/images/jsonformat.png",
      "name": "Nikhil Nagar",
      "time": "5 min read",
      "description": "Why Underground Printing Switched from Gmail to Help Why Underground Printing Switched from Gmail to Help"
    },
    {
      "imgSrc": "https://pcf.gallery/assets/images/jsonformat.png",
      "name": "Nikhil Nagar",
      "time": "5 min read",
      "description": "Why Underground Printing Switched from Gmail to Help Why Underground Printing Switched from Gmail to Help"
    }
  ]
  blogDetail.splice(2)
  return (
    <div>
      <div styleName="styles.sub-section-heading">
        <div styleName="styles.sub-section-heading-name">
          Development
        </div>
        <div styleName="styles.sub-section-heading-view-more">
          View more
        </div>
      </div>
     <Divider />
    <div styleName="styles.blog-list">
      {
        blogDetail.map((elem,index)=>{
          console.log(elem.name)
          return (
            <BlogCard name={elem.name} time={elem.time} imgSrc={elem.imgSrc} description={elem.description}/>
          )
        })
      }
    </div>
    </div>
  )
}



const BlogSection = () => (
  <div styleName= "styles.container">
    <Container styleName="styles.sub-container">
      <div styleName="styles.heading">
        Blogs
      </div>
      <div>
        <Grid>
          <Grid.Column width={8}>
              <Grid.Row>
                <BlogDevelopmentSection />
              </Grid.Row>
              <Grid.Row>
                <BlogDevelopmentSection />
              </Grid.Row>
          </Grid.Column>
          <Grid.Column width={2}></Grid.Column>
          <Grid.Column width={6}>
            <BlogDevelopmentSection />
          </Grid.Column>
        </Grid>
      </div>
    </Container>
  </div>
)

export default BlogSection
