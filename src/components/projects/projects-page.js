import React, { Component } from 'react'
import { Card, Container, Segment, Menu, Icon, Loader } from 'semantic-ui-react'

import ProjectDetail from './project-card'
import { urlApiProjects } from '../../urls'

import styles from '../../css/projects/projects-page.css'
import common from '../../css/page-common-styles.css'
class Projects extends Component {
  constructor(props) {
    super(props)
    this.state = {
      current: 1,
    }
  }

  componentDidMount() {
    this.paginating(1)
  }

  paginating = page => {
    const URL = `${urlApiProjects()}?page=${page}`
    this.props.requestProjectData(URL)
    this.setState({
      current: page,
    })
    window.scrollTo(0, 0)
  }

  leftButtonClick = () => {
    if (this.state.current > 1) {
      let change = this.state.current
      this.setState({ current: change - 1 }, () => {
        this.paginating(this.state.current)
      })
    }
  }

  rightButtonClick = () => {
    if (this.state.current < this.props.apiProjectData.count) {
      let change = this.state.current
      this.setState({ current: change + 1 }, () => {
        this.paginating(this.state.current)
      })
    }
  }

  render() {
    let menu = []
    for (let index = 1; index <= this.props.apiProjectData.count; index++) {
      menu[index] = (
        <Menu.Item
          active={this.state.current == index}
          onClick={() => {
            this.paginating(index)
          }}
        >
          {index}
        </Menu.Item>
      )
    }
    if (this.props.apiProjectData.loaded) {
      return (
        <Container
          textAlign="center"
          styleName="common.margin styles.project-container"
        >
          <div styleName="styles.project-group-container">
            <Card.Group itemsPerRow={4} stackable doubling>
              {this.props.apiProjectData.data.results.map(info => (
                <ProjectDetail info={info} key={info.slug} />
              ))}
            </Card.Group>
          </div>
          {this.props.apiProjectData.count > 1 && (
            <Segment padded basic textAlign="center">
              <Menu pagination>
                <Menu.Item onClick={this.leftButtonClick} icon>
                  <Icon name="chevron left" />
                </Menu.Item>
                {menu}
                <Menu.Item onClick={this.rightButtonClick} icon>
                  <Icon name="chevron right" />
                </Menu.Item>
              </Menu>
            </Segment>
          )}
        </Container>
      )
    } else {
      return <Loader active size="large" />
    }
  }
}
export default Projects
