import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import { connect } from 'react-redux'
import { isBrowser } from 'react-device-detect'
import { Loader } from 'semantic-ui-react'
import { requestInfoData } from '../actions/apiInfoCall'
import { toggleSidebar } from '../actions/sidebarClick'
import { requestMaintainerAccess } from '../actions/apiAuthCall'

import ScrollToTop from './scroll-to-top'
import AppHeader from '../containers/header/appHeader'
import MainPage from '../components/main/main-page'
import Team from '../containers/team/teamPageLoader'
import TeamIndividualView from './team-individual-view'

import Alumni from '../containers/alumni/alumniPageLoader'
import AddMemberDetails from './team/add-member-details'
import AddProjectDetails from './projects/add-project-details'
import Blog from '../containers/blog/blogPageLoader'
import Projects from '../containers/project/projectPageLoader'
import ProjectDetailView from '../containers/project/projectIndividualLoader'
import Sidebar from '../containers/sidebar'
import NoMatch from './404/404'

import AppFooter from '../components/footer/app-footer'

import {
  // Back-end routes
  urlApiLocation,
  urlApiContact,
  urlApiSocial,
  urlApiMaintainerGroup,
  urlApiProjects,
  urlApiLoggedMaintainer,
  // Front-end routes
  urlAppAddMemberDetails,
  urlAppAddProjectDetails,
  urlAppAlumni,
  urlAppBase,
  urlAppBlog,
  urlAppProjects,
  urlAppTeam,
} from '../urls'

import blocks from '../css/app.css'

class App extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const URL_LOCATION = urlApiLocation()
    const URL_CONTACT = urlApiContact()
    const URL_SOCIAL = urlApiSocial()
    const URL_MAINTAINER_GROUP = urlApiMaintainerGroup()
    const URL_PROJECTS = urlApiProjects()
    const AUTH_URL = urlApiLoggedMaintainer()

    this.props.requestInfoData(
      URL_LOCATION,
      URL_CONTACT,
      URL_SOCIAL,
      URL_MAINTAINER_GROUP,
      URL_PROJECTS,
    )
    this.props.requestMaintainerAccess(AUTH_URL)
  }

  handleHide = () => {
    this.props.toggleSidebar(false, 'sidebar-container-shrink')
  }

  handleShow = () => {
    this.props.toggleSidebar(true, 'sidebar-container-expand')
  }

  render() {
    const { apiInfoData } = this.props
    const Switcher = () => (
      <ScrollToTop>
        <Switch>
          <Route
            path="/:url*"
            exact
            strict
            render={props => <Redirect to={`${props.location.pathname}/`} />}
          />

          <Route
            exact
            path={`${urlAppBase()}/`}
            component={routeProps => (
              <MainPage {...routeProps} {...this.props} />
            )}
          />
          <Route exact path={urlAppBlog()} component={Blog} />
          <Route exact path={urlAppProjects()} component={Projects} />
          <Route exact path={urlAppTeam()} component={Team} />
          <Route exact path={urlAppAlumni()} component={Alumni} />
          <Route
            exact
            path={`${urlAppProjects()}/:slug`}
            component={ProjectDetailView}
          />
          <Route
            exact
            path={`${urlAppTeam()}/:handle`}
            render={props => <TeamIndividualView {...props} isActive={true} />}
          />
          <Route
            exact
            path={`${urlAppAlumni()}/:handle`}
            render={props => <TeamIndividualView {...props} isActive={false} />}
          />
          {this.props.isAuthed.loaded && (
            <Switch>
              {this.props.isAuthed.auth && (
                <Switch>
                  <Route
                    exact
                    path={urlAppAddProjectDetails()}
                    component={AddProjectDetails}
                  />
                  <Route
                    exact
                    path={urlAppAddMemberDetails()}
                    component={AddMemberDetails}
                  />
                  <Route
                    exact
                    path={`${urlAppAddProjectDetails()}/:slug`}
                    component={AddProjectDetails}
                  />
                  <Route component={NoMatch} />
                </Switch>
              )}
              <Route component={NoMatch} />
            </Switch>
          )}
        </Switch>
      </ScrollToTop>
    )

    if (
      apiInfoData.locationLoaded &&
      apiInfoData.contactLoaded &&
      apiInfoData.socialLoaded &&
      apiInfoData.footerLoaded &&
      apiInfoData.projectLoaded
    ) {
      return (
        <div styleName="blocks.container">
          <AppHeader
            handleClick={this.handleShow}
            onClick={this.handleHide}
            title={apiInfoData.footerData.name}
            dummy={[]}
          />
          {isBrowser ? (
            <React.Fragment>
              <div styleName="blocks.content-div">
                <Switcher />
              </div>
              <AppFooter info={apiInfoData.footerData} />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <div styleName="blocks.content-div" onClick={this.handleHide}>
                <Switcher />
              </div>
              <Sidebar />
              <AppFooter info={apiInfoData.footerData} />
            </React.Fragment>
          )}
        </div>
      )
    } else {
      return <Loader active size="large" />
    }
  }
}

const mapStateToProps = state => {
  return {
    apiInfoData: state.apiInfoData,
    isAuthed: state.isAuthed,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    requestInfoData: (
      locationUrl,
      socialUrl,
      contactUrl,
      footerUrl,
      projectUrl
    ) => {
      dispatch(
        requestInfoData(
          locationUrl,
          socialUrl,
          contactUrl,
          footerUrl,
          projectUrl
        )
      )
    },
    toggleSidebar: (visible, style) => {
      dispatch(toggleSidebar(visible, style))
    },
    requestMaintainerAccess: url => {
      dispatch(requestMaintainerAccess(url))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
