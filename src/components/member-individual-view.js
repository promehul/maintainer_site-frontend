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
  Transition,
  Loader,
  Menu,
  Radio,
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
import { headers, memberImageStyle } from '../consts'

import common from '../css/page-common-styles.css'
import styles from '../css/team/member-individual-view.css'
import ToggleBtn from './utilComponents/toggleBtn'

class MemberIndividualView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      memberDetails: [],
      loaded: false,
      activeTab: "project",
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
      if (parseInt(user) + 1000 * 5 < dateTime) {
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

  handleItemClick = (e, { name }) => {
    this.setState({ activeTab: name });
  }

  renderContent = () => {
    if (this.state.projectTab) {
      return (
        <>
          {this.state.memberProjects.map((info, index) => (
            <ProjectDetail /* key={index} */ info={info} key={info.slug} />
          ))}
        </>)
    }
    else
      return (
        <>
          Blogs here
        </>
      )
  }

  render() {
    const currentTheme = this.props.currentTheme
    const formalTheme = currentTheme === 'formal'
    const projectTab = this.state.activeTab === 'project'
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

      const image = (formalTheme) ? this.state.memberDetails.formalImage : this.state.memberDetails.childhoodImage
      return (
        <div style={{
          minHeight: '100vh',
          backgroundColor: currentTheme === 'formal' ? '#E3EBFE' : '#1E1E1E'
        }}>
          <div styleName="styles.margin">
            <div style={{ display: "flex" }}>
              <div styleName="styles.backArrow">
                <Icon name='arrow left' size='big'
                  style={{
                    color: !formalTheme ? '#DEE8FF' : ''
                  }}
                />
              </div>
              <div styleName="styles.profile">
                <Grid stackable styleName="styles.grid">
                  <Grid.Column textAlign="left" style={{
                    width: '10rem'
                  }}>
                    <div styleName="styles.pro-image">
                      <div style={memberImageStyle(image, '26rem')} />
                    </div>
                  </Grid.Column>
                  <Grid.Column width={11} style={{
                    paddingLeft: '3em',
                    color: formalTheme ? '#171818' : '#DEE8FF',
                  }}>
                    <div styleName="styles.fullName">
                      {this.state.memberDetails.maintainer.person.fullName}
                    </div>
                    {!formalTheme && (
                      <div styleName="styles.personality">
                        <div styleName="styles.avatar"></div>
                        <div styleName="styles.personalityType">
                          <span>{this.state.memberDetails.personalityType}</span>
                        </div>
                      </div>
                    )}

                    {/* <div styleName="styles.role-designation">
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
                  </div> */}
                    <div styleName="styles.short-biography">
                      {formalTheme ? this.state.memberDetails.formalBiography : this.state.memberDetails.informalBiography}
                    </div>
                    <div styleName="styles.social-links">
                      {this.state.memberDetails.socialInformation[0] &&
                        this.state.memberDetails.socialInformation[0].links.map(
                          (profile, index) => (
                            <div styleName="common.f-link" key={index}
                              site={profile.siteLogo.toLowerCase()}
                            >
                              <Icon
                                title={profile.url}
                                name={profile.siteLogo.toLowerCase()}
                                onClick={() => window.open(profile.url)}
                              />
                            </div>
                          )
                        )}
                    </div>
                    <div styleName="styles.techSkills">{formalTheme ? "Tech Skills" : "Favourites"}
                      {formalTheme ? <TechSkillsCard array={tempArr} /> :
                        <div styleName="styles.fav">
                          <div>
                            <span styleName="styles.favRow">Web Series</span>
                            {this.state.memberDetails.favouriteSeries.split(" ").map(series => (
                              <div key={series.id} styleName="common.darkModeChip">{series}</div>
                            ))}
                          </div>
                          <div>
                            <span styleName="styles.favRow">Sports</span>
                            {this.state.memberDetails.favouriteSports.split(" ").map(sport => (
                              <div key={sport.id} styleName="common.darkModeChip">{sport}</div>
                            ))}
                          </div>
                        </div>
                      }
                    </div>
                  </Grid.Column>
                </Grid>
                <Menu text pointing secondary>
                  <Menu.Item
                    style={{
                      color: formalTheme ? '#171818' : '#DEE8FF',
                      borderBottom: projectTab && formalTheme ? "3px solid #171818" : projectTab && !formalTheme ? '3px solid #DEE8FF' : '',
                    }}
                    name='project'
                    active={projectTab}
                    onClick={this.handleItemClick}
                    styleName={projectTab ? 'styles.options styles.active' : 'styles.options'}
                  />
                  <Menu.Item
                    style={{
                      color: formalTheme ? '#171818' : '#DEE8FF',
                      borderBottom: !projectTab && formalTheme ? "3px solid #171818" : !projectTab && !formalTheme ? '3px solid #DEE8FF' : '',
                    }}
                    name='blog'
                    active={!projectTab}
                    onClick={this.handleItemClick}
                    styleName={!projectTab ? 'styles.options styles.active' : 'styles.options'}
                  />
                </Menu>
                <div styleName="styles.tabs">
                  {Boolean(this.state.memberProjects.length) && (
                    <React.Fragment>
                      <Transition.Group animation="fade" duration={500}>
                        {projectTab && (
                          <div styleName="styles.projectCardTab">
                            <Card.Group itemsPerRow={4} doubling stackable centered>
                              {this.state.memberProjects.map((info, index) => (
                                <ProjectDetail info={info} key={info.slug} />
                              ))}
                            </Card.Group>
                          </div>
                        )}
                        {!projectTab && (
                          <div style={{ display: 'inline-block' }}>
                            <Card.Group itemsPerRow={4} doubling stackable centered>
                              Blogs
                            </Card.Group>
                          </div>
                        )}
                      </Transition.Group>
                    </React.Fragment>
                  )}
                </div>
              </div>
              <div styleName="styles.toggle">
                <ToggleBtn
                  setTheme={this.props.setTheme}
                  formalTheme={this.props.currentTheme === 'formal'}
                />
              </div>
            </div>
          </div>
        </div>

      )
    } else if (this.state.error) {
      return this.state.error
    } else {
      return <Loader active size="large" />
    }
  }
}

export default MemberIndividualView
