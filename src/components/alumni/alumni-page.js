import React, { Component } from 'react'
import { Card, Container, Loader, Segment, Visibility } from 'semantic-ui-react'

import AlumniMember from './alumni-card'

import styles from '../../css/team/team.css'
import common from '../../css/page-common-styles.css'

import { urlApiAlumni } from '../../urls'
class Alumni extends Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 1,
    }
  }

  componentDidMount() {
    const URL = urlApiAlumni()
    this.props.requestAlumniData(URL, this.state.page, true)
  }

  handleUpdate = () => {
    const URL = urlApiAlumni()
    const { count } = this.props.apiAlumniData
    const { page } = this.state
    if (count > page * 12) {
      this.setState(
        {
          page: this.state.page + 1,
        },
        () => {
          this.props.requestAlumniData(URL, this.state.page, false)
        }
      )
    }
  }

  render() {
    const roleOptions = this.props.apiAlumniData.loaded
      ? this.props.apiAlumniData.options.actions.POST.maintainer.children.role
          .choices
      : []
    const designationOptions = this.props.apiAlumniData.loaded
      ? this.props.apiAlumniData.options.actions.POST.maintainer.children
          .designation.choices
      : []
    // const linkOptions = this.props.apiAlumniData.loaded
    //   ? this.props.apiAlumniData.options.actions.POST.socialInformation.child
    //       .children.links.child.children.site.choices
    //   : []

    if (this.props.apiAlumniData.loaded) {
      return (
        <Container textAlign="center" styleName="common.margin">
          <Card.Group itemsPerRow={4} stackable doubling>
            {this.props.apiAlumniData.data.length > 0 ? (
              <React.Fragment>
                {this.props.apiAlumniData.data.map(info => (
                  <AlumniMember
                    info={info}
                    key={info.handle}
                    roleOptions={roleOptions}
                    designationOptions={designationOptions}
                    // linkOptions={linkOptions}
                  />
                ))}
              </React.Fragment>
            ) : null}
            <Visibility once={false} onBottomVisible={this.handleUpdate} />
          </Card.Group>
        </Container>
      )
    } else {
      return <Loader active size="large" />
    }
  }
}

export default Alumni
