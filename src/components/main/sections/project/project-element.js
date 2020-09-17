import React from 'react'
import { Grid, Segment } from 'semantic-ui-react'

import styles from '../../../../css/sections/project/project-element.css'

const ProjectElement = ({ number, name, description, link }) => (
  <Grid.Column
    styleName="styles.element"
    mobile={16}
    tablet={8}
    computer={4}
    verticalAlign="middle"
    href={link}
  >
    <div styleName="styles.background">{number}</div>
    <Segment basic textAlign="right" styleName="styles.text">
      <div styleName="styles.link-text">{name}</div>
      <p styleName="styles.link-desc">{description}</p>
    </Segment>
  </Grid.Column>
)

export default ProjectElement
