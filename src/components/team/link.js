import React from 'react'
import { Segment, Icon } from 'semantic-ui-react'

import style from '../../css/team/add-member-details.css'

class Link extends React.Component {
  constructor(props) {
    super(props)
    this.deleteSkillIcon = React.createRef()
    this.deleteSocialLinkIcon = React.createRef()
  }

  deleteSkill = () => {
    this.props.deleteSkill(this.deleteSkillIcon.current.props.id)
  }

  deleteSocialLink = () => {
    this.props.deleteSocialLink(this.deleteSocialLinkIcon.current.props.id)
  }

  render() {
    const ICON_OPTIONS = this.props.linkListOptions
    let iconText = ''
    if (!this.props.data.url) {
      let data = this.props.data
      data = data.toLowerCase()
      iconText = data.replace(/\s/g, '')
    }
    return (
      <Segment styleName="style.headingBox">
        <div styleName="style.socialBox">
          {ICON_OPTIONS ? (
            <Icon name={ICON_OPTIONS[this.props.data.site]} />
          ) : (
            <img
              height="20"
              width="20"
              src={`https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/${iconText}.svg`}
            />
          )}
          {this.props.data.url ? (
            <p styleName="style.link">{this.props.data.url}</p>
          ) : (
            <p styleName="style.link">{this.props.data}</p>
          )}
        </div>
        {ICON_OPTIONS ? (
          <Icon
            id={this.props.id}
            name="delete"
            onClick={this.deleteSocialLink}
            ref={this.deleteSocialLinkIcon}
          />
        ) : (
          <Icon
            id={this.props.id}
            name="delete"
            onClick={this.deleteSkill}
            ref={this.deleteSkillIcon}
          />
        )}
      </Segment>
    )
  }
}
export default Link
