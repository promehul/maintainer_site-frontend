import React, { Component } from 'react'

import VideoSection from './sections/video/video-section'

import InterestsSection from './sections/interest/interest-section'
import GallerySection from './sections/gallery/gallery-section'
import JourneySection from './sections/journey/journey-section'
import AchievementSection from './sections/acheivement/achievement-section'
import BlogSection from './sections/blogs/blog-section'
import JoinUsSection from './sections/join-us/join-us-section'
import DoAndDontSection from './sections/do-and-dont/do-and-dont-section'
class LifeAtImg extends Component {
    constructor(props) {
      super(props)
    }

    render(){
        const {apiInfoData} = this.props
        return(
            <div>
                <VideoSection/>
                <DoAndDontSection/>
                <InterestsSection/>
                <GallerySection/>
                <JourneySection/>
                <AchievementSection/>
                <BlogSection/>
                <JoinUsSection/>
            </div>
        )
    }
}

export default LifeAtImg;