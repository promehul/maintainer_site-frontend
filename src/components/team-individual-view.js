import React, { Component } from 'react'
import axios from 'axios'
import { Route } from 'react-router-dom'
import {
  Card,
  Image,
  Header,
  Container,
  Icon,
  Segment,
  Divider,
  Grid,
  Reveal,
  Loader,
} from 'semantic-ui-react'

import ProjectDetail from './projects/project-card'
import TechSkillsCard from './team/tech-skills-card'
import NoMatch from './404/404'
import {
  urlApiTeamDetails,
  urlApiAlumniDetails,
  urlApiMaintainerProject,
  urlApiHit,
} from '../urls'
import { headers } from '../consts'

import common from '../css/page-common-styles.css'
import styles from '../css/team/team-individual-view.css'

class TeamIndividualView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      memberDetails: [],
      loaded: false,
      options: [],
      role: '',
      memberProjects: [],
      designation: '',
      error: false,
    }
    this.requestForProjects = this.requestForProjects.bind(this)
  }

  youChoseMe = handle => {
    const user = localStorage.getItem(handle)
    const dateTime = new Date().getTime()
    if (user) {
      if (parseInt(user) + 1000*5 < dateTime) {
        axios.put(`${urlApiHit()}${handle}/`, null, { headers: headers })
        localStorage.setItem(handle, dateTime)
      }
    }
    else {
      axios.put(`${urlApiHit()}${handle}/`, null, { headers: headers })
      localStorage.setItem(handle, dateTime)
    }
  }

  componentDidMount() {
    const { handle } = this.props.match.params
    this.youChoseMe(handle)
    let activeUrl = this.props.isActive
      ? urlApiTeamDetails(handle)
      : urlApiAlumniDetails(handle)
    const URL = `${activeUrl}`
    axios
      .all([axios.get(URL), axios.options(URL)])
      .then(
        axios.spread((memberRes, optionsRes) => {
          this.setState({
            memberDetails: memberRes.data,
            options: optionsRes.data,
            loaded: true,
          })
          this.requestForProjects(memberRes.data.maintainer.id)
        })
      )
      .catch(error => {
        this.setState({
          error: <Route component={NoMatch} />,
        })
      })
  }

  requestForProjects(id) {
    URL = urlApiMaintainerProject(id)
    axios.get(URL).then(res => {
      this.setState({
        memberProjects: res.data,
        loaded: true,
      })
    })
  }

  render() {
    const roleOptions = this.state.loaded
      ? this.state.options.actions.PUT.maintainer.children.role.choices
      : []
    const designationOptions = this.state.loaded
      ? this.state.options.actions.PUT.maintainer.children.designation.choices
      : []

    if (this.state.loaded) {
      let temp = this.state.memberDetails.technicalSkills
      let technicalSkills = temp ? temp : ''
      let tempArr = technicalSkills ? technicalSkills.split(',') : []

      return (
        <div>
          <Container styleName="common.margin">
            <Grid stackable styleName="styles.grid">
              <Grid.Column textAlign="left" width={5}>
                <div styleName="styles.pro-image">
                  <Reveal animated="fade">
                    <Reveal.Content visible>
                      <Image
                        src={this.state.memberDetails.normieImage}
                        styleName="styles.image"
                      />
                    </Reveal.Content>
                    <Reveal.Content hidden>
                      <Image
                        src={this.state.memberDetails.dankImage}
                        styleName="styles.image"
                      />
                    </Reveal.Content>
                  </Reveal>
                </div>
              </Grid.Column>
              <Grid.Column width={11}>
                <Header as="h1">
                  {this.state.memberDetails.maintainer.person.fullName}
                </Header>
                <div styleName="styles.role-designation">
                  {roleOptions.map(
                    (role, index) =>
                      this.state.memberDetails.maintainer.role ===
                        role.value && (
                        <React.Fragment key={index}>
                          {`${role.displayName} | `}{' '}
                        </React.Fragment>
                      )
                  )}
                  {designationOptions.map(
                    (designation, index) =>
                      this.state.memberDetails.maintainer.designation ===
                        designation.value && (
                        <React.Fragment key={index}>
                          {designation.displayName}
                        </React.Fragment>
                      )
                  )}
                </div>
                <div styleName="styles.short-biography">
                  {this.state.memberDetails.shortBiography}
                </div>
                <TechSkillsCard array={tempArr} />
                <div styleName="styles.social-links">
                  {this.state.memberDetails.socialInformation[0] &&
                    this.state.memberDetails.socialInformation[0].links.map(
                      (profile, index) => (
                        <span styleName="styles.f-link" key={index}>
                          <Icon
                            fitted
                            title={profile.url}
                            name={profile.siteLogo.toLowerCase()}
                            onClick={() => window.open(profile.url)}
                          />
                        </span>
                      )
                    )}
                </div>
              </Grid.Column>
            </Grid>

            <Divider section styleName="styles.divider" />

            {Boolean(this.state.memberProjects.length) && (
              <React.Fragment>
                <Header as="h2" textAlign="center" styleName="styles.header">
                  Projects
                </Header>
                <Card.Group itemsPerRow={4} doubling stackable centered>
                  {this.state.memberProjects.map((info, index) => (
                    <ProjectDetail key={index} info={info} key={info.slug} />
                  ))}
                </Card.Group>
              </React.Fragment>
            )}
          </Container>
        </div>
      )
    } else if (this.state.error) {
      return this.state.error
    } else {
      return <Loader active size="large" />
    }
  }
}

export default TeamIndividualView
