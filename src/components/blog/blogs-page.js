import React, { Component, Fragment } from 'react'
import { Card, Container, Segment, Menu, Icon, Loader, Grid } from 'semantic-ui-react'
import { isMobile } from 'react-device-detect'

import BlogDetailWide from './blog-detail-wide'
import { urlApiBlog } from '../../urls'
import { MEDIUM_URL } from '../../consts'

import styles from '../../css/blog/blog-page.css'
import common from '../../css/page-common-styles.css'

import InfoSection from '../main/sections/info/info-section'

class Blog extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const URL = urlApiBlog()
        this.props.requestBlogData(URL)
    }

    componentWillUnmount() {
    }

    render() {
        if (this.props.apiBlogData.loaded) {
            if (this.props.apiBlogData.data && this.props.apiBlogData.data.length) {
                let MEDIUM_PUBLICATION = this.props.apiInfoData.footerData.mediumSlug
                const tagWiseBlogs = this.props.apiBlogData.data
                if (!isMobile) {
                    tagWiseBlogs.sort((a, b) => {
                        if (a.category < b.category) return 1
                        if (a.category > b.category) return -1
                        return 0
                    })
                }

                return (
                    <>
                        <div styleName="styles.blog-group-container">
                            <h2 styleName="styles.head">
                                Blogs
                            </h2>
                        </div>
                        <div
                            textAlign="center"
                            styleName="styles.margin"
                        >
                            {tagWiseBlogs.map((tag, index) => (
                                <div key={index} styleName="styles.blogCategory">
                                    <div styleName="styles.category">
                                        {tag["category"]}
                                    </div>
                                    <div styleName="styles.blog styles.noPadding" >
                                    </div>
                                    <Grid.Row styleName="styles.noPadding" style={{ padding: 0 }}>
                                        {tag["blogsList"].slice(0, 2).map((info, id) => (
                                            <BlogDetailWide info={info} key={id} />
                                        ))}
                                    </Grid.Row>
                                </div>
                            ))}
                        </div >
                        <InfoSection
                            location={this.props.apiInfoData.locationData}
                            contact={this.props.apiInfoData.contactData}
                            social={this.props.apiInfoData.socialData}
                            about={this.props.apiInfoData.footerData}
                        />
                    </>
                )
            } else {
                return (
                    <Container styleName="common.margin">
                        <Segment basic padded textAlign="center">
                            This group doesn't have any blogs as of now. Check back later.
                        </Segment>
                    </Container>
                )
            }
        } else {
            return <Loader active size="large" />
        }
    }
}
export default Blog
