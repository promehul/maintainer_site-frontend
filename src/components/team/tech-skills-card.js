import React, { Component } from 'react'

import styles from '../../css/team/tech-skills-card.css'

class TechSkillsCard extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const techSkills = this.props.array
    return (
      <div styleName="styles.label-container">
        {techSkills.map((info, index) => {
          let icon = info.toLowerCase()
          icon = icon.replace(/\s/g, '')
          return (
            <div styleName="styles.label">
              <img
                key={index}
                height="18"
                src={`https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/${icon}.svg`}
                styleName="styles.label-image"
              />
              {info}
            </div>
          )
        })}
      </div>
    )
  }
}

export default TechSkillsCard
