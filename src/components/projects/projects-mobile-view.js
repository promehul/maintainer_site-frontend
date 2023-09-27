import React, { useEffect, useState } from 'react'
import styles from '../../css/projects/projects-page.css'
import common from '../../css/page-common-styles.css'
import ProjectDetail from './project-card'
import { Card, Loader } from 'semantic-ui-react'
import { urlApiProjects } from '../../urls'

const ProjectsMobileView = (props) => {
    const [projectData, setProjectData] = useState([])

    useEffect(() => {
        props.requestProjectData(`${urlApiProjects()}?page=${1}`)
    }, [])

    useEffect(() => {
        if (props.apiProjectData.data && props.apiProjectData.data.results.length > 0 && projectData.length == 0)
            setProjectData(props.apiProjectData.data.results.slice(0, 4))
    }, [props.apiProjectData.data])

    return (
        props.apiProjectData.loaded
            ? <Card.Group centered >
                <div styleName="styles.list-view">
                    <div styleName="styles.projectGrp">
                        {projectData.map(info => (
                            <ProjectDetail info={info} key={info.slug} profile="informal" />
                        ))}
                    </div>
                </div>
            </Card.Group>
            : <Loader active inline='centered' />
    )
}

export default ProjectsMobileView
