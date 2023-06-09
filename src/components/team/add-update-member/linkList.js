import React from 'react'

import LinkData from './link'
import styles from '../../../css/team/member-form.css'

class LinkList extends React.Component {
  render() {
    const { linkListOptions, data, onDelete } = this.props

    return (
      <div styleName="styles.linksBox">
        {data.map((child, index) => (
          <LinkData
            key={index}
            data={child}
            linkListOptions={linkListOptions}
            onDelete={onDelete}
          />
        ))}
      </div>
    )
  }
}
export default LinkList
