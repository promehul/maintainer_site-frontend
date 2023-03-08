import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { Card, Container, Grid } from 'semantic-ui-react'

import { backgroundImageStyle } from '../../consts'

import styles from '../../css/blog/blog2.css'

const BlogDetail = ({ info }) =>
{
    return (
        <Grid.Column style={{
            padding: "1.3rem 1.8rem 3.7rem 0", margin: "0",
        }} styleName="styles.blogGrid">
            <div className="blog" style={backgroundImageStyle(info.thumbnail)} />
            <div styleName='styles.blogHead'>
                <div className="author">{info.author}</div>
                <div className="time">5 min read</div>
            </div>
            <div styleName="styles.title">{info.title}</div>
        </Grid.Column >
    )
}

export default BlogDetail
