import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { Container } from 'semantic-ui-react'
import { isBrowser } from 'react-device-detect'

import AppHeaderBrowser from './app-header-browser-grid'
import AppHeaderMobile from './app-header-mobile-grid'
import { urlStaticBase } from '../../urls'

import styles from '../../css/header/app-header.css'

class AppHeader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hamburgerStyle: 'hamburger',
    }
    window.addEventListener('scroll', this.handleScroll)
  }



  pageHead = () => {
    return this.props.title
  }

  render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>{this.pageHead()}</title>
          <link rel="icon" href={`${urlStaticBase()}favicon/favicon.ico`} />
          {/* Open graph */}
          <meta property="og:title" content={this.pageHead()} />
          <meta property="og:type" content="website" />
          <meta
            property="og:description"
            content="We are a student group, which cultivates technical innovation and drives the development of software systems and niche applications which empathize with the residents of IIT Roorkee."
          />
          <meta
            property="og:image"
            content={`${urlStaticBase()}thumbnail.png`}
          />
          {/* SEO */}
          <meta name="author" content="Information Management Group" />
          <meta
            name="description"
            content="We are a student group, which cultivates technical innovation and drives the development of software systems and niche applications which empathize with the residents of IIT Roorkee."
          />
          <meta
            name="keywords"
            content="img, information management group, img iit roorkee, imgiitr"
          />
          <meta name="robots" content="index,follow" />
        </Helmet>
        <div styleName="styles.position">
          <div styleName="styles.container">
            {isBrowser ? (
              <AppHeaderBrowser auth={this.props.isAuthed.auth} />
            ) : (
              <AppHeaderMobile
                auth={this.props.isAuthed.auth}
                visible={this.props.sidebarVisible.visible}
                name={this.props.sidebarVisible.name}
                click={this.props.handleClick}
              />
            )}
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default AppHeader
