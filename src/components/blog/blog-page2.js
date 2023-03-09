import React, { Component, Fragment } from 'react'
import { Card, Container, Segment, Icon, Loader, Grid } from 'semantic-ui-react'

import BlogDetail from './blog-post-card2'
import { urlApiBlog } from '../../urls'
import { MEDIUM_URL } from '../../consts'

import styles from '../../css/blog/blog-page2.css'
import common from '../../css/page-common-styles.css'

class Blog extends Component
{
  componentDidMount()
  {
    const URL = urlApiBlog()
    this.props.requestBlogData(URL)
  }

  render()
  {
    if (this.props.apiBlogData.loaded)
    {
      if (this.props.apiBlogData.data && this.props.apiBlogData.data.length)
      {
        let MEDIUM_PUBLICATION = this.props.apiInfoData.footerData.mediumSlug
        const tagWiseBlogs = this.props.apiBlogData.data;
        return (
          <>
            <Container>
              <div styleName="styles.heading">
                <h1 style={{ fontWeight: 700, fontSize: '3rem', fontFamily: 'Poppins' }}>
                  Blogs
                </h1>
              </div>
              <Grid columns={2} style={{ width: "100%", margin: 0 }} stackable>
                <Grid columns={2} styleName="common.margin styles.horizontalGrid" style={{ width: "66.67%" }}>
                  {tagWiseBlogs.slice(0, 2).map((tag, index) => (
                    <Fragment key={index}>
                      <div styleName="styles.blog" style={{ padding: 0 }} >
                        <div styleName="styles.category">
                          {tag["category"]}
                        </div>
                        <div styleName="styles.category-btn"
                          onClick={() => window.open(`${MEDIUM_URL}${MEDIUM_PUBLICATION}`, '_blank')}>
                          View More
                        </div>
                      </div>
                      <Grid.Row>
                        {tag["blogsList"].slice(0, 2).map((info, id) => (
                          <BlogDetail info={info} key={id} />
                        ))}
                      </Grid.Row>
                    </Fragment>
                  ))}
                </Grid>
                <Grid columns={1} style={{ width: "33.33%", marginLeft: "auto", marginTop: 0 }} styleName="styles.horizontalGrid">
                  <div styleName="styles.blog" style={{ padding: 0 }}>
                    <div styleName="styles.category">
                      {tagWiseBlogs[2]["category"]}
                    </div>
                    <div styleName="styles.category-btn"
                      onClick={() => window.open(`${MEDIUM_URL}${MEDIUM_PUBLICATION}`, '_blank')}>
                      View More
                    </div>
                  </div>
                  <Grid.Row >
                    {tagWiseBlogs[2]["blogsList"].slice(0, 2).map((info, id) => (
                      <BlogDetail info={info} key={id} />
                    ))}
                  </Grid.Row>
                </Grid>
              </Grid>
            </Container >
          </>
        )
      } else
      {
        return (
          <Container styleName="common.margin">
            <Segment basic padded textAlign="center">
              This group doesn't have any blogs as of now. Check back later.
            </Segment>
          </Container>
        )
      }
    } else
    {
      return <Loader active size="large" />
    }
  }
}
export default Blog