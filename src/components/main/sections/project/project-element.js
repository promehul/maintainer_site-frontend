import React from "react"
import { Link } from "react-router-dom"
import { Grid, Segment, Header } from "semantic-ui-react"

import styles from "../../../../css/sections/project/project-element.css"

const ProjectElement = ({ number, name, description, link }) => (
    <Grid.Column
        styleName="styles.element"
        mobile={16}
        tablet={8}
        computer={4}
        verticalAlign="middle"
    >
        <div styleName="styles.background">{number}</div>
        <Segment basic textAlign="right" styleName="styles.text">
            <Link to={link} styleName="styles.link">
                <Header as="h2" styleName="styles.link-text">
                    {name}
                </Header>
            </Link>
            <p>{description}</p>
        </Segment>
    </Grid.Column>
)

export default ProjectElement
