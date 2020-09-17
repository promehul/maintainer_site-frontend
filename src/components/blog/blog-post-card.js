import React from 'react'
import moment from 'moment'
import { Card } from 'semantic-ui-react'

import { backgroundImageStyle } from '../../consts'

import styles from '../../css/blog/blog.css'


const BlogDetail = ({ info }) => {
  return (
    <Card target="_blank" href={info.link}>
      <div style={backgroundImageStyle(info.thumbnail)} />
      <Card.Content>
        <Card.Header>{info.title}</Card.Header>
      </Card.Content>
      <Card.Content extra>
        <div styleName="styles.authorDetails">
          <div>{info.author}</div>
        </div>
        <div styleName="styles.blogDetails">
          <div>{`${moment(info.pubDate).format("MMM Do, 'YY")}`}</div>
        </div>
      </Card.Content>
    </Card>
  )
}

export default BlogDetail
