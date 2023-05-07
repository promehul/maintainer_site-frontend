import React, { useState, useEffect } from 'react'
import { Card, Container, Grid } from 'semantic-ui-react'

import { backgroundImageStyle } from '../../consts'

import styles from '../../css/blog/blog-post-card.css'

const BlogDetail = ({ info }) => {
    return (
        <Grid.Column styleName="styles.blogGrid">
            <div styleName="styles.blogInfo">
                <div styleName="styles.blog" style={backgroundImageStyle(info.thumbnail)}
                    onClick={() => window.open(info["link"])} />
                <div styleName='styles.blogHead'>
                    <div className="author">{info.author}</div>
                    <div className="time">5 min read</div>
                </div>
                <div styleName="styles.title"
                    onClick={() => window.open(info["link"])}>
                    {info.title}
                </div>
            </div>
        </Grid.Column >
    )
}

export default BlogDetail
