import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { Route } from 'react-router-dom'
import axios from 'axios'
import { Segment, Container, Loader, Icon } from 'semantic-ui-react'

import NoMatch from '../404/404'
import {
  urlApiProjects,
  urlStaticBase,
  urlAppAddProjectDetails,
} from '../../urls'

import common from '../../css/page-common-styles.css'
import styles from '../../css/projects/project-detail.css'

class ProjectDetailView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      projects: [],
      error: false,
      slug: '',
    }
  }
  componentDidMount() {
    const { slug } = this.props.match.params
    const URL = `${urlApiProjects()}${slug}`
    this.setState({
      slug: slug,
    })

    axios
      .get(URL)
      .then(res => {
        this.setState({
          loaded: true,
          projects: res.data,
        })
      })
      .catch(error => {
        this.setState({
          error: <Route component={NoMatch} />,
        })
      })
  }

  editProject = () => {
    this.props.history.push(`${urlAppAddProjectDetails()}/${this.state.slug}`)
  }

  render() {
    if (this.state.loaded) {
      return (
        <React.Fragment>
          <Helmet>
            <link rel="stylesheet" href={`${urlStaticBase()}prism/prism.css`} />
            <script src={`${urlStaticBase()}prism/prism.js`} />
          </Helmet>
          <Container styleName="common.margin">
            <div styleName="styles.project-header-container">
              <div styleName="styles.project-header">
                {this.state.projects.title}
              </div>
              {this.props.isAuthed.auth && (
                <span styleName="styles.edit-project" onClick={this.editProject}>
                  <Icon
                    name="edit"
                    size="large"
                    styleName="styles.edit-project"
                  />
                  EDIT
                </span>
              )}
            </div>
              <div
                align="left"
                dangerouslySetInnerHTML={{
                  __html: this.state.projects.longDescription,
                }}
              />
            <Segment basic />
          </Container>
        </React.Fragment>
      )
    } else if (this.state.error) {
      return this.state.error
    } else {
      return <Loader active size="large" />
    }
  }
}
export default ProjectDetailView
