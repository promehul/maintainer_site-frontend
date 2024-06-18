import React, { Component, useEffect, useState } from 'react'
import styles from '../../../../css/life_at_img/sections/blog.css'
import { Container,Grid,Image, Responsive } from 'semantic-ui-react'

const BlogCard = (props) =>{
    const [imgSrc,setImgSrc] = useState(props.imgSrc)
    const [profileSrc,setProfileSrc] = useState(props.profileSrc)
    const [name,setName] = useState(props.name)
    const [time,setTime] = useState(props.time)
    const [heading,setHeading] = useState(props.description)
    const [description,setDescription] = useState(props.description)
    const [blogTags,setBlogTags]=useState(["motion", "chatgpt", "figma","motion"])
    return (
        <div>
            <Responsive minWidth={200}>
                <div>
                    <Grid>
                        <Grid.Column width={4}>
                            <img styleName="styles.blog-image" src={imgSrc}/>
                        </Grid.Column>
                        <Grid.Column width={1}/>
                        <Grid.Column width={11}> 
                            <div styleName="styles.blog-author">
                                <img styleName="styles.blog-author-image" src={profileSrc} />
                                <div styleName="styles.blog-author-name">
                                    {name}
                                </div>
                            </div>
                            <div styleName="styles.blog-heading">
                                {heading}
                            </div>
                            <div styleName="styles.blog-description">
                                {description}
                            </div>
                            <div styleName="styles.blog-specs">
                                <div styleName="styles.blog-reading-time">
                                    {time}
                                </div>
                                {
                                    blogTags.map((elem,index)=>{
                                        return(
                                            <div styleName="styles.blog-tags">
                                                {elem}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </Grid.Column> 
                    </Grid>
                </div>
            </Responsive>
        </div>
    )
}

const BlogSection=()=>{
    const [blogDetail,setBlogDetail] = useState([]) ;      useEffect(() => {
            fetch('http://localhost:60000/api/maintainer_site/blog/')
                .then(response => response.json())
                .then(data => {
                    const blogs = data.map(category => category.blogsList).flat();
                    const formattedBlogs = blogs.map(blog => ({
                        profileSrc: '', 
                        imgSrc: blog.thumbnail,
                        name: blog.author,
                        time: blog.pubDate,
                        description: blog.description
                    }));
                    setBlogDetail(formattedBlogs);
                })
                .catch(error => console.error(error));
        }, []);
      useEffect(()=>{
        if(blogDetail.length > 3){
            let tempBlogDetail = blogDetail
            setBlogDetail(tempBlogDetail.splice(0,3))
      }
    },[])
    return(
        <div styleName="styles.container">
            <Container styles="styles.sub-container">
            <div styleName="styles.heading">Experience blogs</div>
            <div>
                {blogDetail.map((elem,index)=>{
                    return(
                        <BlogCard imgSrc={elem.imgSrc} name={elem.name} time={elem.time} description={elem.description} profileSrc={elem.profileSrc} index={index} />
                    )
                })}
            </div>
            </Container>
            
        </div>
    )
}

export default BlogSection
