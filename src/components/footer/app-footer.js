import React, { Component } from 'react'
import { isBrowser } from 'react-device-detect'
import { Container, Icon, Label, Popup } from 'semantic-ui-react'

import { CREATORS } from '../../consts'

import styles from '../../css/footer/app-footer.css'

class FooterSection extends Component {
  constructor(props) {
    super(props)
    this.state = {
      clickCounter: 0,
      iconVisible: false,
      creatorVisible: false,
    }
  }

  handleClickCounter = () => {
    this.setState(
      {
        clickCounter: this.state.clickCounter + 1,
      },
      () => {
        if (this.state.clickCounter === 2) {
          this.setState({
            iconVisible: true,
          })
        }
      }
    )
  }

  handleEasterEggDispatch = () => {
    this.setState({
      iconVisible: false,
      creatorVisible: true,
    })
  }

  render() {
    if (this.state.clickCounter < 2) {
      let date = new Date()
      return (
        <footer styleName="styles.container" onClick={this.handleClickCounter}>
          <Container>{`© ${date.getFullYear()} ${
            this.props.info.name
          }`}</Container>
        </footer>
      )
    } else {
      return (
        <footer styleName="styles.container" styleName="styles.center">
          <Container textAlign="center">
            {this.state.iconVisible && (
              <Popup
                content="Meet the team"
                position="top center"
                trigger={
                  <Icon
                    name="heart"
                    styleName="styles.heart"
                    onClick={this.handleEasterEggDispatch}
                  />
                }
              />
            )}
            {this.state.creatorVisible && <Creators />}
          </Container>
        </footer>
      )
    }
  }
}

const Creators = () => {
  return (
    <React.Fragment>
      {CREATORS.map((creator, index) => (
        <Label
          key={index}
          image
          as="a"
          styleName="styles.label"
          href={creator.url}
          target="_blank"
        >
          {creator.name}
          {isBrowser && <Label.Detail>{creator.role}</Label.Detail>}
        </Label>
      ))}
    </React.Fragment>
  )
}

export default FooterSection
