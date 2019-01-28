import React from "react"
import moment from "moment"
import { Card, Image } from "semantic-ui-react"
import styles from "../../css/blog/blog.css"

const MEDIUM_URL = "https://medium.com/"
const MEDIUM_PUBLICATION = "img-iit-roorkee"
const BLOG_IMAGE_URL = "https://cdn-images-1.medium.com/max/600/"
const AUTHOR_IMAGE_URL = "https://cdn-images-1.medium.com/fit/c/50/50/"

const BlogDetail = ({ info, pub }) => (
    <Card raised target="_blank">
        <Image
            fluid
            src={BLOG_IMAGE_URL + info.imageId}
            href={`${MEDIUM_URL}${pub}/${info.slug}-${info.id}`}
        />
        <Card.Content
            textAlign="left"
            href={`${MEDIUM_URL}${pub}/${info.slug}-${info.id}`}
        >
            <Card.Header>{info.title}</Card.Header>
            <Card.Description>{info.subtitle}</Card.Description>
        </Card.Content>
        <Card.Content extra>
            <div styleName="styles.author-details">
                <div>
                    <Image
                        avatar
                        spaced="right"
                        src={`${AUTHOR_IMAGE_URL}${info.authorImageId}`}
                        href={`${MEDIUM_URL}@${info.username}`}
                    />

                    <a
                        href={`${MEDIUM_URL}@${info.username}`}
                        styleName="styles.link"
                    >
                        {info.name}
                    </a>
                </div>
            </div>
            <div styleName="styles.blog-details">
                <div>{`${moment(info.createdAt).format(
                    "MMM Do, 'YY"
                )} · ${Math.ceil(info.readingTime)} min`}</div>
            </div>
        </Card.Content>
    </Card>
)

export default BlogDetail
