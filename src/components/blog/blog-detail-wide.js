import React, { useState, useEffect } from 'react'
import { Card, Container, Grid } from 'semantic-ui-react'

import { backgroundImageStyle } from '../../consts'

import common from '../../css/page-common-styles.css'
import styles from '../../css/blog/blog-detail-wide.css'

const BlogDetailWide = ({ info }) => {
    return (
        <div styleName="styles.blog">
            <div styleName="styles.blogImage" style={backgroundImageStyle(info.thumbnail)}
                onClick={() => window.open(info["link"])}
            />
            <div styleName="styles.details">
                <div styleName='styles.blogHead'>
                    <div>{info.author}</div>
                </div>
                <div styleName="styles.title" onClick={() => window.open(info["link"])}>
                    {info.title}
                </div>
                <div styleName="styles.description" onClick={() => window.open(info["link"])}>
                    {info.description}
                </div>
                <div styleName="styles.otherDetails">
                    <div styleName="styles.time">
                        5 min read
                    </div>
                    <div styleName="styles.tags">
                        {info.categories.slice(0, 2).map((category) => (
                            <div styleName="common.lightModeChip styles.chips">
                                {category}
                            </div>))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogDetailWide
