import React from 'react'
import { Link } from 'react-router-dom'
import { urlAppProjects } from '../../../../urls'
import GridLayout from './project-grid-layout'
import { Responsive } from 'semantic-ui-react'
import { ProjectList } from '../../../../containers/project/projectPageLoader'

import styles from '../../../../css/sections/project/project-main.css'
import common from '../../../../css/sections/common-styles.css'

const ProjectSection = ({ project }) => {
    return (
        <div styleName="styles.container">
            <div styleName="styles.projectSection">
                <div styleName="styles.heading">
                    <div styleName="styles.projectHead">
                        Projects
                    </div>
                    <Responsive minWidth={500}>
                        <Link to={urlAppProjects()}>
                            <div styleName="styles.view-btn">
                                View more
                            </div>
                        </Link>
                    </Responsive>
                </div>
                <Responsive minWidth={1400}>
                    <GridLayout projectData={project} />
                </Responsive>
                <Responsive maxWidth={1400}>
                    <ProjectList />
                </Responsive>
            </div>
        </div >
    )
}

export default ProjectSection
