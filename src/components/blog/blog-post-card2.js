import React from 'react'
import moment from 'moment'
import { Card, Container, Grid } from 'semantic-ui-react'

import { backgroundImageStyle } from '../../consts'

import styles from '../../css/blog/blog2.css'


const BlogDetail = ({ info }) =>
{
    return (
        // <Card target="_blank" href={info.link}>
        //     <div style={backgroundImageStyle(info.thumbnail)} />
        //     <Card.Content>
        //         <Card.Header>{info.title}</Card.Header>
        //     </Card.Content>
        //     <Card.Content extra>
        //         <div styleName="styles.authorDetails">
        //             <div>{info.author}</div>
        //         </div>
        //         <div styleName="styles.blogDetails">
        //             <div>{`${moment(info.pubDate).format("MMM Do, 'YY")}`}</div>
        //         </div>
        //     </Card.Content>
        // </Card>
        // <Grid columns={2}>
        <Grid.Column>
            <div className="blog" style={backgroundImageStyle(info.thumbnail)} />
            <div className="info.blogHead">
                <div className="author">{info.author}</div>
                <div className="time">5 min read</div>
            </div>
            <div className="title">{info.title}</div>
        </Grid.Column>
        // </Grid>
    )
}

export default BlogDetail
