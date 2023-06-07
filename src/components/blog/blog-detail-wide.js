import React, { useState, useEffect } from 'react'
import { Card, Container, Grid } from 'semantic-ui-react'

import { backgroundImageStyle, headers } from '../../consts'
import { urlApiMaintainerBlog } from '../../urls'
import axios from 'axios'

import common from '../../css/page-common-styles.css'
import styles from '../../css/blog/blog-detail-wide.css'

class BlogDetailWide extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            modelData: null,
        }
    }

    componentDidMount() {
        const { info } = this.props

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

        return (
            <div styleName="styles.blog">
                <div
                    styleName="styles.blogImage"
                    style={backgroundImageStyle(thumbnail)}
                    onClick={() => window.open(info['link'])}
                />
                <div styleName="styles.details">
                    <div styleName="styles.blogHead">
                        <div>{author ? author : info.author}</div>
                    </div>
                    <div
                        styleName="styles.title"
                        onClick={() => window.open(info["link"])}
                    >
                        {info.title}
                    </div>
                    <div
                        styleName="styles.description"
                        onClick={() => window.open(info["link"])}
                    >
                        {info.description}
                    </div>
                    <div styleName="styles.otherDetails">
                        <div styleName="styles.time">{readTime} min read</div>
                        <div styleName="styles.tags">
                            {info.categories.slice(0, 2).map((category) => (
                                <div styleName="common.lightModeChip styles.chips">
                                    {category}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default BlogDetailWide
