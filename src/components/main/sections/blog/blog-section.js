import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, Grid, Image, Segment, Sematic, Divider,Loader } from 'semantic-ui-react'

import { urlStaticBase } from '../../../../urls'


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
  return (
    <span styleName="styles.blog-card" >
      <div>
        <img src={imgSrc} styleName="styles.blog-card-image" />
      </div>
      <div styleName="styles.blog-card-meta">
        <div>
          {name}
        </div>
        <div>
          {time}
        </div>
      </div>
      <div >
        {description.substring(1, 20)}
      </div>
    </span>
  )
}

const BlogDevelopmentSection = () => {
  const blogDetail = [
    {
      "imgSrc": "https://pcf.gallery/assets/images/jsonformat.png",
      "name": "Nikhil Nagar",
      "time": "5 mins read",
      "description": "How to hire for "
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
          blogDetail.map((elem, index) => {
            return (
              <BlogCard name={elem.name} time={elem.time} imgSrc={elem.imgSrc} description={elem.description} />
            )
          })
        }
      </div>
    </div>
  )
}



const BlogSection = (props) => {

  useEffect(() => {
    const URL = urlApiBlog()
    props.requestBlogData(URL)
  }, [])
  if (props.apiBlogData.loaded) {
    if (props.apiBlogData.data && props.apiBlogData.data.length) {
      let MEDIUM_PUBLICATION = props.apiInfoData.footerData.mediumSlug
      const tagWiseBlogs = props.apiBlogData.data
      if (!isMobile) { 
        tagWiseBlogs.sort((a, b) => {
          if (a.category < b.category) return 1
          if (a.category > b.category) return -1
          return 0
        })
        return (
          <div styleName="styles.container">
            {console.log(props.apiBlogData)}
            <Container styleName="styles.sub-container">
              <div styleName="styles.heading">
                Blogs
              </div>
              <div>
                <Grid>
                  <Grid.Column width={10}>
                    <Grid.Row>
                      <BlogDevelopmentSection />
                    </Grid.Row>
                    <Grid.Row>
                      <div styleName="styles.space"></div>
                    </Grid.Row>
                    <Grid.Row>
                      <BlogDevelopmentSection />
                    </Grid.Row>
                  </Grid.Column>
                  <Grid.Column width={2}></Grid.Column>
                  <Grid.Column width={4}>
                    <BlogDevelopmentSection />
                  </Grid.Column>
                </Grid>
              </div>
            </Container>
          </div>
        )
      }
    }
    else {
      return (
        <Container >
            <Segment basic padded textAlign="center">
                This group doesn't have any blogs as of now. Check back later.
            </Segment>
        </Container>
    )
    }
    
  }else {
    return <Loader active size="large" />
}

}

export default BlogSection
