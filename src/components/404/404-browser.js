import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'

import { ErrorDart } from 'formula_one'

import styles from '../../css/404.css'

class NoMatchBrowser extends Component {
  render() {
    return (
      <Container styleName="styles.container">
        <ErrorDart />
      </Container>
    )
  }
}

export default NoMatchBrowser
