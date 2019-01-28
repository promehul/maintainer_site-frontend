import React, { Component } from "react"
import { Header, Segment, Container } from "semantic-ui-react"
import axios from "axios"

import common from "../../css/page-common-styles.css"
import styles from "../../css/projects/project-detail.css"
const slug = "something"

class ProjectDetailView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            projects: [],
        }
    }
    componentDidMount() {
        const { slug } = this.props.match.params
        const URL = `/api/maintainer_site/projects/${slug}`

        axios.get(URL).then(res => {
            this.setState({
                projects: res.data,
            })
            console.log(res)
        })
    }

    render() {
        return (
            <div>
                <Container styleName="common.margin">
                    <Header as="h1" styleName="styles.fonts">
                        {this.state.projects.title}
                    </Header>

                    <Segment basic compact>
                        <div
                            align="left"
                            dangerouslySetInnerHTML={{
                                __html: this.state.projects.longDescription,
                            }}
                        />
                    </Segment>
                    <Segment basic padded />
                </Container>
            </div>
        )
    }
}
export default ProjectDetailView
