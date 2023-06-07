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
            projectData: [],
        };
    }

    componentDidMount() {
        this.props.requestProjectData(`${urlApiProjects()}?page=${1}`)
        window.addEventListener('scroll', this.handleScroll)
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll)
    }

    componentDidUpdate(prevProps) {
        if ((this.props.apiProjectData.data !== prevProps.apiProjectData.data) && (JSON.stringify(this.state.projectData) !== JSON.stringify(this.props.apiProjectData.data.results))) {
            this.setState({
                ...this.state,
                projectData: this.state.projectData.concat(this.props.apiProjectData.data.results)
            })
        }
    }

    handleScroll = () => {
        const { scrollHeight, scrollTop, clientHeight } = document.documentElement
        if (scrollTop + clientHeight >= scrollHeight) {
            const nextPage = this.state.current + 1
            this.paginating(nextPage)
        }
    }

    paginating = (page) => {
        const URL = `${urlApiProjects()}?page=${page}`
        if (this.state.current !== page) {
            if (!this.props.apiProjectData.data || this.props.apiProjectData.data.next) {
                this.props.requestProjectData(URL)
            }
            this.setState({
                ...this.state,
                current: page,
            })
        }
    }

    render() {
        let menu = []
        for (let index = 0; index <= this.props.apiProjectData.count; index++) {
            menu[index] = (
                <Menu.Item
                    active={this.state.current == index + 1}
                    onClick={() => {
                        this.paginating(index + 1)
                    }}
                >
                    {index}
                </Menu.Item>
            )
        }
        if (this.props.apiProjectData.loaded) {
            return (
                <div
                    textAlign="center"
                    styleName="styles.project-container"
                >
                    <div styleName="styles.project-group-container">
                        <h2 styleName="styles.head">Projects</h2>
                        <div styleName="styles.project-grid">
                            <div styleName="styles.projectGrp">
                                {this.state.projectData.map(info => (
                                    <ProjectDetail info={info} key={info.slug} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div >
            )
        } else {
            return <Loader active size="large" />
        }
    }
}
export default Projects
