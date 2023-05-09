import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'
import { Link, NavLink } from 'react-router-dom'

import { urlAppBase, urlAppBlog, urlAppProjects, urlAppAddMemberDetails, urlAppAddProjectDetails, urlAppMember, } from '../../urls'

import browserStyles from '../../css/header/app-header-browser-grid.css'
import common from '../../css/page-common-styles.css'

const COMMON_ACTIVE_STYLE = {
  borderBottom: '1px solid',
}

const ACTIVE_STYLE = {
  projects: {
    ...COMMON_ACTIVE_STYLE,
    borderColor: '#45C57A',
    color: '#45C57A',
  },
  blogs: {
    ...COMMON_ACTIVE_STYLE,
    borderColor: '#DD5C93',
    color: '#DD5C93',
  },
  members: {
    ...COMMON_ACTIVE_STYLE,
    borderColor: '#FFA109',
    color: '#FFA109',
  },
  culture: {
    ...COMMON_ACTIVE_STYLE,
    borderColor: '#7D69FF',
    color: '#7D69FF',
  },
};

class AppHeaderBrowser extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div styleName="browserStyles.navBar common.noPadding">
        <div styleName="browserStyles.btn browserStyles.grpName" verticalAlign="center">
          <Link to={`${urlAppBase()}`}>
            IMG
          </Link>
        </div>
        <div styleName="browserStyles.linksCol common.noPadding">
          <div name="projects" styleName="browserStyles.btn">
            <NavLink to={`${urlAppProjects()}`} activeStyle={ACTIVE_STYLE.projects}>
              Projects
            </NavLink>
          </div>
          <div name="blog" styleName="browserStyles.btn">
            <NavLink to={`${urlAppBlog()}`} activeStyle={ACTIVE_STYLE.blogs}>
              Blogs
            </NavLink>
          </div>
          <div name="members" styleName="browserStyles.btn">
            <NavLink to={`${urlAppMember()}`} activeStyle={ACTIVE_STYLE.members}>
              Members
            </NavLink>
          </div>
          <div name="culture" styleName="browserStyles.btn">
            <NavLink /* to={`${urlAppMember()}`} */ to={`${urlAppBase()}`} activeStyle={ACTIVE_STYLE.culture} >
              Life at IMG
            </NavLink>
          </div>
          {this.props.auth && (
            <React.Fragment>
              <div name="add_member" styleName="browserStyles.btn" >
                <NavLink to={`${urlAppAddMemberDetails()}`} activeStyle={ACTIVE_STYLE} >
                  * Member
                </NavLink>
              </div>
              <div name="add_project" styleName="browserStyles.btn" >
                <NavLink to={`${urlAppAddProjectDetails()}`} activeStyle={ACTIVE_STYLE} >
                  * Project
                </NavLink>
              </div>
            </React.Fragment>
          )}
        </div>
      </div>
    )
  }
}

export default AppHeaderBrowser
