import React, { Component } from 'react'
import { Image } from 'semantic-ui-react'

import styles from "../../css/utilComponents/toggleBtn.css"

import { urlStaticBase } from '../../urls'

class ToggleBtn extends Component {
    constructor(props) {
        super(props)
        const setTheme = props.setTheme
        this.state = {
            formalTheme: props.formalTheme
        }
    }

    changeTheme = (formalTheme) => {
        const setTheme = this.props.setTheme
        setTheme(formalTheme ? 'informal' : 'formal')
        this.setState({
            formalTheme: !this.state.formalTheme
        })
    }

    render() {
        const formalTheme = this.state.formalTheme
        return (
            <div
                styleName="styles.bar"
                style={{
                    backgroundColor: formalTheme ? '#D5DEF2' : '#6F6F6F',
                }}
                onClick={(e) => { this.changeTheme(formalTheme) }}
            >
                <div
                    styleName="styles.circle"
                    style={{
                        left: formalTheme ? '0.3rem' : '2.6rem'
                    }}
                >
                    <Image
                        src={`${urlStaticBase()}radio.svg`}
                    />
                </div>
            </div>
        )
    }
}

export default ToggleBtn
