import React, { Component } from 'react'
import { Container, Grid, Segment } from 'semantic-ui-react'
import styles from '../../../../css/sections/project/project-grid-layout.css'
import { urlApiProjects } from '../../../../urls'

const TITLE_BOX_WIDTH = '71.35%'
const APP_BOX_WIDTH = '14.28%'
const BOX_COUNT = 18
const TOGGLE_INTERVAL_MS = 2000
const MAINTAGLINE = "The work that makes a huge difference for IITR junta."

const TitleBox = (props) => {
    const { tagLine } = props
    return (
        <Grid.Column styleName="styles.noPadding" style={{ width: TITLE_BOX_WIDTH }}>
            <div styleName="styles.tagLine">
                {tagLine}
            </div>
        </Grid.Column>
    )
}

class AppBox extends Component {
    render() {
        const { projectData, onMouseEnter, onMouseLeave } = this.props
        const titleToColorMap = {
            'placement_online': 'linear-gradient(315deg, rgba(171, 199, 255, 0.45) 0%, rgba(116, 161, 254, 0.5) 100%)',
            'people_search': 'linear-gradient(133.32deg, rgba(135, 136, 255, 0.5) 0%, rgba(197, 198, 255, 0.33) 100%)',
            'slambook': 'linear-gradient(135deg, rgba(246, 147, 149, 0.5) 0%, rgba(246, 147, 149, 0.6) 0.01%, rgba(255, 225, 225, 0.4) 100%)',
            'chakra': 'linear-gradient(135.28deg, rgba(42, 138, 203, 0.5) 0%, rgba(42, 138, 203, 0.6) 0.01%, rgba(173, 222, 255, 0.31) 100%)',
            'connect_e_dil': 'linear-gradient(133.04deg, rgba(69, 97, 138, 0.5) 0%, rgba(65, 87, 120, 0.5) 0.01%, rgba(139, 170, 215, 0.33) 100%)',
            'noticeboard': 'linear-gradient(133.04deg, rgba(255, 118, 134, 0.63) 0%, rgba(255, 144, 157, 0.66) 0.01%, rgba(255, 192, 201, 0.25) 100%)',
            'iitr_website': 'linear-gradient(136.96deg, rgba(14, 110, 184, 0.5) 0%, rgba(110, 178, 230, 0.45) 100%)',
            'r_drive': 'linear-gradient(135deg, rgba(88, 91, 220, 0.55) 0%, rgba(185, 186, 253, 0.33) 100%)',
        }
        const appBg = {
            'placement_online': 'rgba(21, 22, 27, 0.33)',
            'people_search': 'rgba(34, 34, 56, 0.33)',
            'slambook': 'rgba(62, 53, 53, 0.33)',
            'chakra': 'rgba(23, 25, 29, 0.33)',
            'connect_e_dil': 'rgba(23, 25, 29, 0.33)',
            'noticeboard': 'rgba(38, 42, 45, 0.33)',
            'iitr_website': 'rgba(43, 49, 52, 0.33)',
            'r_drive': 'rgba(38, 39, 53, 0.33)',
        }
        const boxBgColor = projectData.slug ? titleToColorMap[projectData.slug] : '#171818'
        const appBgColor = projectData.slug ? appBg[projectData.slug] : ''
        return (
            <Grid.Column
                styleName="styles.gridLayout">
                <Container styleName="styles.app" style={{ background: boxBgColor, }} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                    {projectData.title ?
                        <div styleName="styles.appDetails">
                            <div style={{ backgroundColor: appBgColor }} styleName="styles.logoDiv">
                                <img src={projectData.image}
                                    styleName="styles.logo" />
                            </div>
                            <div styleName="styles.appTitle">{projectData.title}</div>
                        </div>
                        : ''
                    }
                </Container>
            </Grid.Column >
        )
    }
}

class GridLayout extends Component {
    constructor(props) {
        super(props)
        const projectData = this.props.projectData
        const projectCount = projectData.length
        let minSpacing = Math.floor(BOX_COUNT / projectCount)
        let gridsRemaining = Math.min(projectCount, BOX_COUNT - 4)
        let projectGrids = Array.from({ length: BOX_COUNT }, () => ({}))
        for (let i = 0; i < gridsRemaining; i++) {
            const project = projectData[i]
            let gridIndex = i * minSpacing
            let spacing = minSpacing + Math.floor(Math.random() * 3) - 1
            gridIndex += Math.floor(Math.random() * spacing)
            projectGrids[gridIndex] = { title: project.title, image: project.image, shortDescription: project.shortDescription, slug: project.slug }
        }
        this.state = {
            projectGrids,
            tagLine: MAINTAGLINE,
        }
    }

    handleAppHover = (e, projectData) => {
        if (projectData.shortDescription != null)
            this.setState({ ...this.state.projectGrids, tagLine: projectData.shortDescription })
    }

    resetTagLine = () => {
        this.setState({ ...this.state.projectGrids, tagLine: MAINTAGLINE })
    }


    componentDidMount() {
        this.toggleIntervalId = setInterval(() => {
            const randomId = Math.floor(Math.random() * BOX_COUNT)
            const newGrid = [...this.state.projectGrids]
            const availableProjects = this.props.projectData.filter(project => !newGrid.some(box => box.title === project.title))
            if (availableProjects.length > 0) {
                const randomProjectIndex = Math.floor(Math.random() * availableProjects.length)
                const randomProject = availableProjects[randomProjectIndex]
                newGrid[randomId] = randomProject
            } else {
                newGrid[randomId] = ''
            }
            this.setState({ ...this.state.tagLine, projectGrids: newGrid })
        }, TOGGLE_INTERVAL_MS)
    }

    componentWillUnmount() {
        clearInterval(this.toggleIntervalId)
    }

    render() {
        const projectGrids = this.state.projectGrids
        const apps = []
        for (let i = 0; i < BOX_COUNT; i++) {
            apps.push(
                <AppBox key={i} id={i} projectData={projectGrids[i]} onMouseEnter={(e) => this.handleAppHover(e, projectGrids[i])} onMouseLeave={(e) => this.resetTagLine(projectGrids[i])}
                />
            )
        }
        return (
            <div styleName="styles.container">
                <Container>
                    <Grid columns={7}>
                        <Grid.Row style={{ padding: 0 }}>
                            {apps.slice(0, 7).map((app) => (
                                <Grid.Column key={app.id} style={{ padding: 0 }}>
                                    {app}
                                </Grid.Column>
                            ))}
                        </Grid.Row>
                        <Grid.Row styleName="styles.midRow styles.noPadding">
                            <Grid.Column styleName="styles.noPadding" style={{ width: APP_BOX_WIDTH }} >
                                {apps.slice(7, 9).map((app) => (
                                    <Grid.Row key={app.id} styleName="styles.noPadding">
                                        {app}
                                    </Grid.Row>
                                ))}
                            </Grid.Column>
                            <TitleBox tagLine={this.state.tagLine} />
                            <Grid.Column styleName="styles.noPadding" style={{ width: APP_BOX_WIDTH }}>
                                {apps.slice(9, 11).map((app) => (
                                    <Grid.Row key={app.id} style={{ padding: 0 }} >
                                        {app}
                                    </Grid.Row>
                                ))}
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row styleName="styles.noPadding">
                            {apps.slice(11, 18).map((app) => (
                                <Grid.Column key={app.id} styleName="styles.noPadding">
                                    {app}
                                </Grid.Column>
                            ))}
                        </Grid.Row>
                    </Grid>
                </Container>
            </div>
        )
    }
}

export default GridLayout
