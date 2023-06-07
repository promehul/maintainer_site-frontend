import React, { Component } from 'react'
import styles from '../../css/team/tech-skills-card.css'
import common from '../../css/page-common-styles.css'
import { Icon } from 'semantic-ui-react'
import axios from 'axios'

class TechSkillsCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      iconExists: false,
      iconUrl: '',
    }
    this.cancelTokenSource = axios.CancelToken.source()
  }

  componentDidMount() {
    const skill = this.props.skill
    let icon = skill.toLowerCase().replace(/\s/g, '')
    const iconUrl = `https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/${icon}.svg`
    axios
      .get(iconUrl)
      .then(response => {
        if (response.status === 200) {
          this.setState({ iconExists: true, iconUrl: iconUrl })
        }
      })
      .catch(error => {
        if (!axios.isCancel(error)) {
          this.setState({ iconExists: false })
        }
      })
  }

  componentWillUnmount() {
    this.cancelTokenSource.cancel('Component is unmounting')
  }

  render() {
    const skill = this.props.skill
    return (
      <div styleName="common.lightModeChip styles.lightModeChip">
        {this.state.iconExists ? (
          <img
            height="18"
            src={this.state.iconUrl}
          />
        ) : (
          <Icon name='globe' />
        )}
        <div styleName="styles.skillName">{skill}</div>
      </div>
    )
  }
}

export default TechSkillsCard
