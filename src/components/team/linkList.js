import React from 'react'
import { Segment } from 'semantic-ui-react'

import Link from './link'

class LinkList extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const linkListOptions = this.props.linkListOptions
    return (
      <Segment.Group>
        {this.props.data.map((child, index) => {
          return (
            <Link
              id={child.id ? child.id : index}
              key={index}
              data={child}
              name={this.props.name}
              deleteSkill={this.props.deleteSkill}
              linkListOptions={linkListOptions ? linkListOptions : undefined}
              deleteSocialLink={this.props.deleteSocialLink}
            />
          )
        })}
      </Segment.Group>
    )
  }
}
export default LinkList
