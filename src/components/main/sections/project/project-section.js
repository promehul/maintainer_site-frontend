import React from 'react'
import { Link } from 'react-router-dom'
import { urlAppProjects } from '../../../../urls'
import GridLayout from './project-grid-layout'
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
                    <Link to={urlAppProjects()}>
                        <div styleName="styles.view-btn">
                            View more
                        </div>
                    </Link>
                </div>
                <div styleName="styles.grid">
                    <GridLayout projectData={project} />
                </div>
            </div>
        </div>
    )
}

export default ProjectSection