import React, { Component } from 'react'
import { Container, Grid, Image } from 'semantic-ui-react'

import { urlStaticBase } from '../../../../urls'

import styles from '../../../../css/sections/main/main-section-browser.css'

class MainBrowser extends Component {
  render() {
    return (
      <div styleName="styles.container">
        <Container>
          <Grid columns={2}>
            <Grid.Column>
              <h1 styleName="styles.site-title">Playing with</h1>
              <br />
              <h1 styleName="styles.site-title">new ideas</h1>
              <p styleName="styles.site-para">
                The group flaunts a wide spectrum of projects, influencing over
                eight thousand lives on campus.
              </p>
            </Grid.Column>
            <Grid.Column>
              <div styleName="styles.image">
                <Image
                  src={`${urlStaticBase()}computer.png`}
                  size="large"
                />
              </div>
            </Grid.Column>
          </Grid>
        </Container>
      </div>
    )
  }
}

export default MainBrowser
