import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Image, Grid, Segment } from 'semantic-ui-react'
import { urlStaticBase, urlAppProjects } from '../../../../urls'
import GridLayout from './project-grid-layout'
import styles from '../../../../css/sections/project/project-main.css'
import common from '../../../../css/sections/common-styles.css'

const ProjectSection = ({ project }) => {
    return (
        <div styleName="styles.container">
            <Container>
                <div styleName="styles.heading">
                    <div style={{ fontWeight: 700, fontSize: '3rem', fontFamily: 'Archivo', color: '#EDEEF5' }}>
                        Projects
                    </div>
                    <Link to={urlAppProjects()}>
                        <div styleName="styles.view-btn">
                            View More
                        </div>
                    </Link>
                </div>
                <GridLayout projectData={project} />
            </Container>
        </div>
    )
}

export default ProjectSection