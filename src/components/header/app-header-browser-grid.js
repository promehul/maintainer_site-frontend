import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'
import { Link, NavLink } from 'react-router-dom'

import {
  urlStaticBase,
  urlAppBase,
  urlAppBlog,
  urlAppProjects,
  urlAppTeam,
  urlAppAlumni,
  urlAppAddMemberDetails,
  urlAppAddProjectDetails,
} from '../../urls'

import logoStyles from '../../css/header/app-header-logo.css'
import browserStyles from '../../css/header/app-header-browser-grid.css'

const ACTIVE_NAV_STYLE = {
  borderBottom: '2.5px solid #000000',
}

class AppHeaderBrowser extends Component {
  constructor(props) {
    super(props)
  }

  handleLogoStyle = () => {
    if (window.scrollY > 0) {
      return 'maintainer-logo-after-scroll-main'
    } else {
      if (window.location.pathname === `${urlAppBase()}/`) {
        return 'maintainer-logo-before-scroll-main'
      } else {
        return 'maintainer-logo-after-scroll-main'
      }
    }
  }

  handleNavStyle = () => {
    if (window.scrollY > 0) {
      return 'link-after-scroll-main'
    } else {
      if (window.location.pathname === `${urlAppBase()}/`) {
        return 'link-before-scroll-main'
      } else {
        return 'link-after-scroll-main'
      }
    }
  }

  render() {
    return (
      <Grid columns={2} verticalAlign="middle">
        {' '}
        <Grid.Column>
          <Link to={`${urlAppBase()}`} styleName="logoStyles.link">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              styleName={`logoStyles.${this.handleLogoStyle()}`}
              viewBox="0 0 100 100"
            >
              <use xlinkHref={`${urlStaticBase()}logo.svg#maintainer_logo`} />
            </svg>
          </Link>
        </Grid.Column>
        <Grid.Column>
          <div styleName="browserStyles.button">
            <NavLink
              to={`${urlAppBlog()}`}
              styleName="browserStyles.link-color"
              activeStyle={ACTIVE_NAV_STYLE}
            >
              <button
                name="blog"
                styleName={`browserStyles.${this.handleNavStyle()}`}
              >
                Blog
              </button>
            </NavLink>
            <NavLink
              to={`${urlAppProjects()}`}
              styleName="browserStyles.link-color"
              activeStyle={ACTIVE_NAV_STYLE}
            >
              <button
                name="projects"
                styleName={`browserStyles.${this.handleNavStyle()}`}
              >
                Projects
              </button>
            </NavLink>
            <NavLink
              to={`${urlAppTeam()}`}
              styleName="browserStyles.link-color"
              activeStyle={ACTIVE_NAV_STYLE}
            >
              <button
                name="team"
                styleName={`browserStyles.${this.handleNavStyle()}`}
              >
                Team
              </button>
            </NavLink>
            <NavLink
              to={`${urlAppAlumni()}`}
              styleName="browserStyles.link-color"
              activeStyle={ACTIVE_NAV_STYLE}
            >
              <button
                name="team"
                styleName={`browserStyles.${this.handleNavStyle()}`}
              >
                Alumni
              </button>
            </NavLink>
            {this.props.auth && (
              <React.Fragment>
                <NavLink
                  to={`${urlAppAddMemberDetails()}`}
                  styleName="browserStyles.link-color"
                  activeStyle={ACTIVE_NAV_STYLE}
                >
                  <button
                    name="add_member"
                    styleName={`browserStyles.${this.handleNavStyle()}`}
                  >
                    * Member
                  </button>
                </NavLink>
                <NavLink
                  to={`${urlAppAddProjectDetails()}`}
                  styleName="browserStyles.link-color"
                  activeStyle={ACTIVE_NAV_STYLE}
                >
                  <button
                    name="add_project"
                    styleName={`browserStyles.${this.handleNavStyle()}`}
                  >
                    * Project
                  </button>
                </NavLink>
              </React.Fragment>
            )}
          </div>
        </Grid.Column>
      </Grid>
    )
  }
}

export default AppHeaderBrowser
