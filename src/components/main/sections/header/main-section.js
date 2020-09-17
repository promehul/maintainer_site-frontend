import React, { Component } from 'react'
import { isBrowser } from 'react-device-detect'
import MainMobile from './main-section-mobile'
import MainBrowser from './main-section-browser'

import styles from '../../../../css/sections/main/main-section.css'

class MainSection extends Component {
  render() {
    if (isBrowser) {
      return (
        <div styleName="styles.container">
          <MainBrowser />
        </div>
      )
    } else {
      return (
        <div styleName="styles.container">
          <MainMobile />
        </div>
      )
    }
  }
}

export default MainSection
