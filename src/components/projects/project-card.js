import React from 'react'
import { Card } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import { backgroundImageStyle } from '../../consts'
import { urlAppProjects } from '../../urls'

import styles from '../../css/projects/project-card.css'

const ProjectDetail = ({ info }) => {
    return (
        <Link to={`${urlAppProjects()}/${info.slug}`}>
            <div styleName="styles.project-card" appSlug={info.slug}>
                <div styleName="styles.logo" >
                    <img styleName="styles.logoImg" src={info.image} />
                </div>
                <div styleName="styles.title">
                    {info.title}
                </div>
                <div styleName="styles.shortDesc">
                    {info.shortDescription}
                </div>
                <div styleName="styles.viewBtn">
                    View More
                </div>
            </div>
        </Link>
    )
}
export default ProjectDetail
