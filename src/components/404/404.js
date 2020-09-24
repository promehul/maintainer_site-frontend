import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { isBrowser } from 'react-device-detect'

import NoMatchBrowser from './404-browser'
import NoMatchMobile from './404-mobile'

class NoMatch extends Component {
  render() {
    return (
      <React.Fragment>
        {isBrowser ? (
          <Route component={NoMatchBrowser} />
        ) : (
          <Route component={NoMatchMobile} />
        )}
      </React.Fragment>
    )
  }
}

export default NoMatch
