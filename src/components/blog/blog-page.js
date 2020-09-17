import React, { Component } from "react";
import { Card, Container, Segment, Icon, Loader } from "semantic-ui-react";

import BlogDetail from "./blog-post-card";
import { urlApiBlog } from "../../urls";
import { MEDIUM_URL } from "../../consts";

import common from "../../css/page-common-styles.css";

class Blog extends Component {
  componentDidMount() {
    const URL = urlApiBlog();
    this.props.requestBlogData(URL);
  }

  render() {
    if (this.props.apiBlogData.loaded) {
      let MEDIUM_PUBLICATION = this.props.apiInfoData.footerData.mediumSlug;

      return (
        <Container styleName="common.margin">
          <Card.Group itemsPerRow={3} stackable doubling>
            {this.props.apiBlogData.data.map((info, id) => (
              <BlogDetail info={info} key={id} />
            ))}
          </Card.Group>
          {MEDIUM_PUBLICATION && MEDIUM_PUBLICATION !== "" ? (
            <Segment basic padded textAlign="center">
              <Icon
                name="medium"
                size="large"
                link={true}
                onClick={() =>
                  window.open(`${MEDIUM_URL}${MEDIUM_PUBLICATION}`, "_blank")
                }
              />
            </Segment>
          ) : null}
        </Container>
      );
    } else {
      return <Loader active size="large" />;
    }
  }
}
export default Blog;
