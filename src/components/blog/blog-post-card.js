import React, { useState, useEffect } from 'react'
import { Card, Container, Grid } from 'semantic-ui-react'
import axios from 'axios'

import { backgroundImageStyle, headers } from '../../consts'

import styles from '../../css/blog/blog-post-card.css'
import { urlApiMaintainerBlog } from '../../urls'

class BlogDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modelData: null,
        }
    }

    componentDidMount() {
        const { info } = this.props
        const isModelData = info.hasOwnProperty("displayImage") && info.hasOwnProperty("readTime")

        if (!isModelData && info.hasOwnProperty('guid')) {
            const guid = info.guid.substring(info.guid.replace(/\/$/, '').lastIndexOf('/') + 1)
            axios({
                method: 'get',
                url: urlApiMaintainerBlog(),
                params: {
                    guid: guid,
                },
                headers: headers,
            })
                .then(response => {
                    this.setState({
                        modelData: response.data
                    })
                })
        }
    }
    render() {
        const { info, author } = this.props
        const { modelData } = this.state
        const isModelData = info.hasOwnProperty("displayImage") && info.hasOwnProperty("readTime")

        const thumbnail = isModelData
            ? info.displayImage
            : modelData === null
                ? info.thumbnail
                : modelData.displayImage
        const readTime = isModelData
            ? info.readTime
            : modelData === null
                ? "5"
                : modelData.readTime
        const link = isModelData
            ? info.url
            : modelData === null
                ? info.link
                : modelData.url

        return (
            <Grid.Column styleName="styles.blogGrid">
                <div styleName="styles.blogInfo">
                    <div
                        styleName="styles.blog"
                        style={backgroundImageStyle(thumbnail)}
                        onClick={() => window.open(link)}
                    />
                    <div styleName="styles.blogHead">
                        <div className="author">{author ? author : info.author}</div>
                        <div className="time">{readTime} min read</div>
                    </div>
                    <div
                        styleName="styles.title"
                        onClick={() => window.open(link)}
                    >
                        {info.title}
                    </div>
                </div>
            </Grid.Column>
        )
    }
}


export default BlogDetail
