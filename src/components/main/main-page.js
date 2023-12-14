import React, { Component } from 'react'

import MainSection from './sections/header/main-section'
import ProjectSection from './sections/project/project-section'
import { BlogSectionMainPage } from '../../containers/blog/blogPageLoader'
import InfoSection from './sections/info/info-section'
import CultureCodeSection from './sections/static/culture-code/culture-code-section'
import DoAndDontSection from './sections/static/do-and-dont/do-and-dont-section'
import CarouselSection from './sections/carousel/carousel-section'
class MainPage extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { apiInfoData } = this.props
    const {
      contactData,
      footerData,
      locationData,
      projectData,
      socialData,
    } = apiInfoData
    return (
      <div>
        <MainSection />
        <ProjectSection project={projectData.results} />
        <BlogSectionMainPage />
        <CarouselSection />
        <CultureCodeSection />
        <DoAndDontSection />
        <InfoSection
          location={locationData}
          contact={contactData}
          social={socialData}
          about={footerData}
        />
        
      </div>
    )
  }
}

export default MainPage
