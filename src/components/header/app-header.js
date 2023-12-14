import React, { Component } from 'react'
import { Responsive, Menu, Icon, Sidebar, Image } from 'semantic-ui-react'
import { Link, NavLink, withRouter } from 'react-router-dom'
import Helmet from 'react-helmet'
import axios from 'axios'

import { urlAppBase, urlAppBlog, urlAppProjects, urlAppAddMemberDetails, urlApiLoggedMaintainer, urlStaticBase, urlAppMember, urlAppTeam, urlAppAlumni, whoAmI, urlLifeAtImg } from '../../urls'
import {
    getThemeObject,
    DefaultDP
} from 'formula_one'

import common from '../../css/page-common-styles.css'
import styles from '../../css/header/app-header.css'

const COMMON_ACTIVE_STYLE = {
    borderBottom: '1px solid',
}

const ACTIVE_STYLE = {
    projects: {
        ...COMMON_ACTIVE_STYLE,
        borderColor: '#45C57A',
        color: '#45C57A',
    },
    blogs: {
        ...COMMON_ACTIVE_STYLE,
        borderColor: '#DD5C93',
        color: '#DD5C93',
    },
    members: {
        ...COMMON_ACTIVE_STYLE,
        borderColor: '#FFA109',
        color: '#FFA109',
    },
    culture: {
        ...COMMON_ACTIVE_STYLE,
        borderColor: '#7D69FF',
    },
}
class AppHeader extends Component {
    constructor(props) {
        super(props)
        this.state = {
            sidebarVisible: false,
            member: null,
            error: null,
            newMaintainerInfo: false,
        }
        this.ref = React.createRef()
    }

    componentDidMount() {
        const url = urlApiLoggedMaintainer()
        axios.get(url).then(res => {
            if (res.data.length === 0) {
                axios.get(whoAmI()).then(res => {
                    this.setState({ ...this.state, member: res.data, newMaintainerInfo: true })
                }).catch(err => {
                    this.setState({ ...this.state, error: err.message })
                })
            }
            this.setState({ ...this.state, member: res.data })
        }).catch(err => {
            this.setState({ ...this.state, error: err.message })
        })
    }

    pageHead = () => {
        return this.props.title
    }

    isActiveMember = () => {
        const { location } = this.props
        const memberUrls = [urlAppTeam(), urlAppMember(), urlAppAlumni()]
        return memberUrls.some(url => location.pathname.includes(url))
    }

    componentDidUpdate(prevProps) {
        if (prevProps.location !== this.props.location) {
            if (prevProps.currentTheme === 'informal') {
                this.props.setTheme('formal')
            }
        }
    }

    handleToggleSidebar = () => {
        this.setState((currentState) => ({
            sidebarVisible: !currentState.sidebarVisible,
        }))
    }

    render() {
        const currentTheme = this.props.currentTheme
        const formalTheme = currentTheme === 'formal'

        return (
            <React.Fragment>
                <Helmet>
                    <title>{this.pageHead()}</title>
                    <link rel="icon" href={`${urlStaticBase()}favicon/favicon.ico`} />
                    {/* Open graph */}
                    <meta property="og:title" content={this.pageHead()} />
                    <meta property="og:type" content="website" />
                    <meta
                        property="og:description"
                        content="We are a student group, which cultivates technical innovation and drives the development of software systems and niche applications which empathize with the residents of IIT Roorkee."
                    />
                    <meta
                        property="og:image"
                        content={`${urlStaticBase()}thumbnail.png`}
                    />
                    {/* SEO */}
                    <meta name="author" content="Information Management Group" />
                    <meta
                        name="description"
                        content="We are a student group, which cultivates technical innovation and drives the development of software systems and niche applications which empathize with the residents of IIT Roorkee."
                    />
                    <meta
                        name="keywords"
                        content="img, information management group, img iit roorkee, imgiitr"
                    />
                    <meta name="robots" content="index,follow" />
                </Helmet>
                <Responsive maxWidth={900} styleName="styles.container">
                    <div styleName="styles.navBar"
                        style={{
                            backgroundColor: currentTheme === 'formal' ? '#DEE8FF' : '#101111',
                        }}
                    >
                        <div styleName="styles.btn styles.grpName" verticalAlign="center">
                            <Link to={`${urlAppBase()}`}
                                style={{ color: !formalTheme ? '#DEE8FF' : '#171818' }}
                            >
                                IMG
                            </Link>
                        </div>
                        <div styleName="styles.hamburger styles.btn" verticalAlign="center" onClick={this.handleToggleSidebar}
                            ref={this.ref}>
                            <Icon name="bars" styleName="styles.noMargin" />
                        </div>
                        <Sidebar
                            as={Menu}
                            animation="overlay"
                            direction="left"
                            visible={this.state.sidebarVisible}
                            vertical
                            onHide={() => {
                                if (this.ref.current && !this.ref.current.contains(event.target))
                                    this.setState({ sidebarVisible: false })
                            }}
                            inverted
                            style={{ backgroundColor: formalTheme ? '#DEE8FF' : '#101111' }}
                        >
                            <div styleName="styles.sidebarLinks common.noPadding">
                                <div name="projects" styleName="styles.btn">
                                    <NavLink to={`${urlAppProjects()}`} styleName={formalTheme ? "styles.links" : "styles.darkLinks"} activeStyle={ACTIVE_STYLE.projects}>
                                        Projects
                                    </NavLink>
                                </div>
                                <div name="blog" styleName="styles.btn">
                                    <NavLink to={`${urlAppBlog()}`} styleName={formalTheme ? "styles.links" : "styles.darkLinks"} activeStyle={ACTIVE_STYLE.blogs}>
                                        Blogs
                                    </NavLink>
                                </div>
                                <div name="members" styleName="styles.btn">
                                    <NavLink to={`${urlAppMember()}`} styleName={formalTheme ? "styles.links" : "styles.darkLinks"} activeStyle={ACTIVE_STYLE.members}
                                        isActive={this.isActiveMember}
                                    >
                                        Members
                                    </NavLink>
                                </div>
                                <div name="culture" styleName="styles.btn">
                                    <NavLink styleName={formalTheme ? "styles.links" : "styles.darkLinks"} to={`${urlAppBase()}`}
                                        style={{ color: '#7D69FF', }}
                                        activeStyle={ACTIVE_STYLE.culture} exact >
                                        Life at IMG
                                    </NavLink>
                                </div>
                                {(this.state.member && this.props.isAuthed.auth) && (
                                    <div name="add_member" styleName="styles.btn" >
                                        <NavLink to={`${urlAppAddMemberDetails()}`} styleName={formalTheme ? "styles.links" : "styles.darkLinks"} activeStyle={ACTIVE_STYLE.members} >
                                            Profile
                                        </NavLink>
                                    </div>)}
                            </div>
                        </Sidebar>
                    </div>
                </Responsive>
                <Responsive minWidth={900}>
                    <div styleName="styles.container">

                        <div styleName="styles.navBar"
                            style={{
                                backgroundColor: currentTheme === 'formal' ? '#DEE8FF' : '#101111',
                            }}
                        >
                            <div styleName="styles.btn styles.grpName" verticalAlign="center">
                                <Link to={`${urlAppBase()}`}
                                    style={{ color: !formalTheme ? '#DEE8FF' : '#171818' }}
                                >
                                    IMG
                                </Link>
                            </div>
                            <div styleName="styles.rightCol">
                                <div styleName="styles.linksCol common.noPadding">
                                    <div name="projects" styleName="styles.btn">
                                        <NavLink to={`${urlAppProjects()}`} styleName={formalTheme ? "styles.links" : "styles.darkLinks"} activeStyle={ACTIVE_STYLE.projects}>
                                            Projects
                                        </NavLink>
                                    </div>
                                    <div name="blog" styleName="styles.btn">
                                        <NavLink to={`${urlAppBlog()}`} styleName={formalTheme ? "styles.links" : "styles.darkLinks"} activeStyle={ACTIVE_STYLE.blogs}>
                                            Blogs
                                        </NavLink>
                                    </div>
                                    <div name="members" styleName="styles.btn">
                                        <NavLink to={`${urlAppMember()}`} styleName={formalTheme ? "styles.links" : "styles.darkLinks"} activeStyle={ACTIVE_STYLE.members}
                                            isActive={this.isActiveMember}
                                        >
                                            Members
                                        </NavLink>
                                    </div>
                                    <div name="culture" styleName="styles.btn">
                                        <NavLink styleName={formalTheme ? "styles.links" : "styles.darkLinks"} to={`${urlLifeAtImg()}`}
                                            style={{ color: '#7D69FF', }}
                                            activeStyle={ACTIVE_STYLE.culture} exact >
                                            Life at IMG
                                        </NavLink>
                                    </div>
                                </div>
                                {this.props.isAuthed.auth &&
                                    <div name="profile" styleName="styles.profileImg">
                                        <div name="profile" styleName="styles.profileImg">
                                            <NavLink to={`${urlAppAddMemberDetails()}`} styleName={formalTheme ? "styles.links" : "styles.darkLinks"}>
                                                {(this.state.member && this.state.member.length > 0)
                                                    ? this.state.member[0].maintainer.person.displayPicture
                                                        ? <Image src={this.state.member[0].maintainer.person.displayPicture} styleName="styles.profile" />
                                                        : <span>
                                                            <DefaultDP name={this.state.member && this.state.member[0].maintainer.person.fullName}
                                                                gravatarHash={this.state.member[0].maintainer.person.gravatarHash} dummy={{}} />
                                                        </span>
                                                    : this.state.newMaintainerInfo
                                                        ? this.state.member && this.state.member.displayPicture !== '' && this.state.member.displayPicture
                                                            ? <Image
                                                                avatar
                                                                src={this.state.member['displayPicture']}
                                                                alt={this.state.member && this.state.member['fullName'][0]}
                                                                style={{ background: getThemeObject().hexCode }}
                                                            />
                                                            : <span>
                                                                <DefaultDP name={this.state.member && this.state.member.fullName}
                                                                    gravatarHash={this.state.member.gravatarHash} dummy={{}} />
                                                            </span>
                                                        : null}
                                            </NavLink>
                                        </div>
                                    </div>}
                            </div>
                        </div>
                    </div>
                </Responsive>
            </React.Fragment >
        )
    }
}

export default withRouter(AppHeader)
