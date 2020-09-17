import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'

import { ErrorRabbit } from 'formula_one'

import styles from '../../css/404.css'

class NoMatchMobile extends Component {
  render() {
    return (
      <Container styleName="styles.container">
        <ErrorRabbit />
      </Container>
    )
  }
}

export default NoMatchMobile
