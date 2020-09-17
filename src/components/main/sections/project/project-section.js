import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Image, Grid, Segment } from 'semantic-ui-react'

import ProjectElement from './project-element'

import { urlStaticBase, urlAppProjects } from '../../../../urls'

import styles from '../../../../css/sections/project/project-main.css'
import common from '../../../../css/sections/common-styles.css'

const ProjectSection = ({ project }) => (
  <div styleName="styles.container">
    <Container textAlign="center">
      <h1 styleName="common.header">Projects</h1>
      <Image
        src={`${urlStaticBase()}project.png`}
        size="medium"
        styleName="styles.image"
        centered
      />

      <Grid padded columns={4} centered>
        {Object.keys(project).map((key, index) => (
          <ProjectElement
            key={project[key].slug}
            name={project[key].title}
            number={index + 1}
            description={project[key].shortDescription}
            link={`${urlAppProjects()}/${project[key].slug}`}
          />
        ))}
      </Grid>
      <Segment basic>
        <Link to={urlAppProjects()}>
          <div styleName="common.button">View more</div>
        </Link>
      </Segment>
    </Container>
  </div>
)

export default ProjectSection
