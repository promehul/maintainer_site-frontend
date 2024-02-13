import React, { Component } from 'react'
import styles from '../../css/team/tech-skills-card.css'
import common from '../../css/page-common-styles.css'
import axios from 'axios'

class TechSkillsCard extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const skill = this.props.skill
    return (
      <div styleName="common.lightModeChip styles.lightModeChip">
        <div styleName="styles.skillName">{skill}</div>
      </div>
    )
  }
}

export default TechSkillsCard
