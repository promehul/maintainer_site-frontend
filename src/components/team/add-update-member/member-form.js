import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import {
    Form, Button, Dropdown, Message, Loader, Icon, Image, Transition, Label
} from 'semantic-ui-react'

import {
    urlApiLoggedMaintainer, urlApiSocialLink, urlAppTeam, urlAppAlumni, urlAppAddProjectDetails, urlApiMaintainerBlog, urlPersonalityTest,
} from '../../../urls'

import { backgroundImageStyle, headers, memberImageStyle, personalityTypeOptions, validateLink } from '../../../consts'
import { ImageUploader } from '../../../containers/member/memberFormLoader'
import ToggleBtn from '../../utilComponents/toggleBtn'
import LinkList from './linkList'

import styles from '../../../css/team/member-form.css'
import common from '../../../css/page-common-styles.css'

class AddMemberDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            URL: urlApiLoggedMaintainer(),
            method: 'post',
            canAddInformal: true,
            loaded: false,
            profile: {},
            handleName: '',
            nickName: '',
            shortBio: '',
            shortFunBio: '',
            wantToBe: '',
            personalityType: '',

            skills: { array: [], entry: '' },
            sports: { array: [], entry: '' },
            webSeries: { array: [], entry: '' },
            socialLinks: { array: [], site: '', url: '' },
            favourites: {
                selectedOption: 'sports',
            },

            oldBlogs: {},
            newBlog: {
                url: '',
                readTime: null,
                title: '',
                error: false,
                updated: false,
            },

            uploadChildhoodImage: {
                id: 'uploadChildhoodImage',
                croppedImageSrc: null,
            },
            uploadFormalImage: {
                id: 'uploadFormalImage',
                croppedImageSrc: null,
            },
            uploadBlogImage: {
                id: 'uploadBlogImage',
                open: false,
                croppedImageSrc: null,
            },

            prevUploadedChildhood: null,
            prevUploadedFormal: null,
            socialLinksOptions: [],

            error: {
                handle: false,
                nickName: false,
                shortFunBio: false,
                shortBio: false,
                wantToBe: false,
                uploadFormalImage: false,
                uploadChildhoodImage: false,
                personalityType: false,
            },

            errorUrl: false,
            errorSite: false,
        }
    }

    componentDidMount() {
        const maintainerURL = urlApiLoggedMaintainer()
        axios.all([axios.get(maintainerURL), axios.options(maintainerURL)]).then(
            axios.spread((memberRes, linksRes) => {
                this.setState(
                    {
                        profile: memberRes.data,
                        socialLinksOptions:
                            linksRes.data.actions.POST.socialInformation.child.children.links
                                .child.children.site.choices,
                    },
                    () => {
                        if (this.state.profile.length) {
                            this.setState({ method: 'patch' })
                            this.setState({
                                URL: maintainerURL + this.state.profile[0].informalHandle + '/',
                            })
                            this.setState({
                                handleName: this.state.profile[0].informalHandle,
                                shortBio: this.state.profile[0].formalBiography,
                                skills: {
                                    array: this.state.profile[0].technicalSkills
                                        ? this.state.profile[0].technicalSkills.split(',')
                                        : [],
                                    entry: '',
                                },
                                prevUploadedChildhood: this.state.profile[0].childhoodImage,
                                prevUploadedFormal: this.state.profile[0].formalImage,
                                nickName: this.state.profile[0].nickName,
                                shortFunBio: this.state.profile[0].informalBiography,
                                personalityType: this.state.profile[0].personalityType,
                                wantToBe: this.state.profile[0].wantToBe,
                                sports: {
                                    array: this.state.profile[0].favouriteSports
                                        ? this.state.profile[0].favouriteSports.split(',')
                                        : [],
                                    entry: '',
                                },
                                webSeries: {
                                    array: this.state.profile[0].favouriteSeries
                                        ? this.state.profile[0].favouriteSeries.split(',')
                                        : [],
                                    entry: '',
                                },

                            })
                        }
                        else {
                            this.setState({ canAddInformal: false })
                        }
                        axios.get(urlApiSocialLink()).then(res => {
                            this.setState({
                                socialLinks: { ...this.state.socialLinks, array: res.data },
                                loaded: true,
                            },
                                () => {
                                    if (this.state.handleName !== null && this.state.handleName !== "") {
                                        axios.get(`${urlApiMaintainerBlog()}${this.state.handleName}/`).then(res => {
                                            this.setState({
                                                ...this.state,
                                                oldBlogs: res.data,
                                            })
                                        })
                                    }
                                })
                        })
                    })
            }
            )
        )
    }

    componentDidUpdate(prevProps) {
        const { uploadFormalImage, uploadChildhoodImage, uploadBlogImage } = this.state
        const imageIds = [uploadFormalImage.id, uploadChildhoodImage.id, uploadBlogImage.id]

        if (prevProps.uploadedImage !== this.props.uploadedImage) {
            Object.entries(this.props.uploadedImage).forEach(([id]) => {
                if (imageIds.includes(id)) {
                    this.handleClose(id)
                }
            })
        }
    }

    inputSocialLinkChange = (e, name, data = undefined) => {
        if (name === 'site' && this.state.errorSite)
            this.setState({ errorSite: false })
        this.setState({
            socialLinks: {
                ...this.state.socialLinks,
                [name]: e.target.value === undefined ? data.value : e.target.value,
            },
        })
    }

    addLink = e => {
        const that = this
        if (this.state.socialLinks.site) {
            that.setState({ errorUrl: false })
            axios({
                method: 'post',
                url: urlApiSocialLink(),
                data: {
                    site: this.state.socialLinks.site,
                    url: this.state.socialLinks.url,
                },
                headers: headers,
            })
                .then(response => {
                    this.setState({
                        socialLinks: {
                            array: [...this.state.socialLinks.array, response.data],
                            site: '',
                        },
                    })
                })
                .catch(function (response) {
                    if (response.response.data.url != null) {
                        that.setState({ errorUrl: true })
                    }
                })
        } else {
            that.setState({ errorSite: true })
        }
    }

    deleteSocialLink = id => {
        axios({
            method: 'delete',
            url: urlApiSocialLink() + id + '/',
            headers: headers,
        }).then(response => {
            this.setState({
                socialLinks: {
                    array: this.state.socialLinks.array.filter(link => link.id !== id),
                },
            })
        })
    }

    deleteBlog = guid => {
        axios({
            method: 'delete',
            url: urlApiMaintainerBlog() + guid + '/',
            headers: headers,
        }).then(response => {
            this.setState(prevState => ({
                oldBlogs: prevState.oldBlogs.filter(blog => blog.guid !== guid),
            }))
        })
    }

    handleFavChange = (e, { value }) => {
        this.setState({ favourites: { ...this.state.favourites, selectedOption: value } }, () => {
        })
    }

    handleEntryChange = (e) => {
        const category = e.target.name
        this.setState(currentState => ({
            [category]: { ...currentState[category], entry: e.target.value }
        }))
    }

    handlePersonalityTypeChange = (event, data) => {
        this.setState({
            ...this.state, error: {
                ...this.state.error,
                personalityType: false,
            }, personalityType: data.value
        })
    }

    addEntry = (category) => {
        this.setState(currentState => {
            const updatedArray = [...currentState[category].array, currentState[category].entry]
            return {
                [category]: {
                    array: [...new Set(updatedArray)],
                    entry: '',
                }
            }
        })
    }

    deleteEntry = (category, id) => {
        this.setState(currentState => {
            const newArray = currentState[category].array.filter((_, index) => index !== id)
            return {
                [category]: {
                    array: newArray,
                    entry: currentState[category].entry,
                }
            }
        })
    }


    handleBlogUpdate = () => {
        const { newBlog, handleName, uploadBlogImage } = this.state

        if (!validateLink(newBlog.url)) {
            this.setState({ newBlog: { ...this.state.newBlog, error: true } })
            return Promise.reject('Invalid link')
        }

        const newUploadedBlogImage = uploadBlogImage.croppedImage ? uploadBlogImage.croppedImage : null

        if (
            newUploadedBlogImage &&
            handleName &&
            newBlog.title &&
            newBlog.readTime &&
            newBlog.url
        ) {
            var formData = new FormData()
            formData.append('handle_name', handleName)
            formData.append('read_time', newBlog.readTime)
            formData.append('title', newBlog.title)
            formData.append('url', newBlog.url)

            if (newUploadedBlogImage && newUploadedBlogImage.type) {
                if (newUploadedBlogImage.type.substring(0, 5) === 'image') {
                    formData.append('display_image', newUploadedBlogImage)
                }
            }

            const that = this

            return new Promise((resolve, reject) => {
                axios({
                    method: 'post',
                    url: urlApiMaintainerBlog(),
                    data: formData,
                    headers: { ...headers, 'Content-Type': 'multipart/form-data' },
                })
                    .then(function (response) {
                        that.setState({ newBlog: { ...that.state.newBlog, updated: true } })
                        resolve()
                    })
                    .catch(function (error) {
                        reject(error)
                    })
            })
        } else {
            return Promise.reject('Missing required fields')
        }
    }

    finishUpdate = (that, isAlumni, handleName) => {
        if (isAlumni)
            that.props.history.push(`${urlAppAlumni()}/${handleName}`)
        else
            that.props.history.push(`${urlAppTeam()}/${handleName}`)
    }

    handleUpdate = () => {
        const formalTheme = this.props.currentTheme === 'formal'
        if (this.state.newBlog.url && !this.state.newBlog.updated) {
            this.handleBlogUpdate()
                .then(() => {
                    if (formalTheme)
                        this.handleFormalUpdate()
                    else
                        this.handleInformalUpdate()
                })
        }
        else {
            formalTheme ? this.handleFormalUpdate() : this.handleInformalUpdate()
        }
    }

    handleFormalUpdate = () => {
        if (this.state.newBlog.url && !this.state.newBlog.updated)
            this.handleBlogUpdate()
        if (!this.state.newBlog.url || this.state.newBlog.updated) {
            const {
                handleName,
                shortBio,
                skills,
                uploadFormalImage,
                prevUploadedFormal,
            } = this.state

            const newUploadedFormal = uploadFormalImage.croppedImage
                ? uploadFormalImage.croppedImage : null
            const skillsArray = skills.array

            if ((newUploadedFormal || prevUploadedFormal) &&
                handleName
            ) {
                var formData = new FormData()
                formData.append('informal_handle', handleName)
                if (shortBio !== null) {
                    formData.append('formal_biography', shortBio);
                }
                formData.append('technical_skills', skillsArray)

                if (newUploadedFormal && newUploadedFormal.type)
                    if (newUploadedFormal.type.substring(0, 5) == 'image')
                        formData.append('formal_image', newUploadedFormal)

                const that = this
                that.setState({ error: { ...this.state.error, shortBio: false } })
                axios({
                    method: this.state.method,
                    url: this.state.URL,
                    data: formData,
                    headers: { ...headers, 'Content-Type': 'multipart/form-data' },
                })
                    .then(function (response) {
                        const isAlumni = response.data.isAlumni
                        that.finishUpdate(that, isAlumni, handleName)
                    })
                    .catch(function (response) {
                        if (response.response.data.informalHandle != null) {
                            that.setState({ error: { ...that.state.error, handle: true } })
                        }
                        if (response.response.data.formalBiography != null) {
                            that.setState({ error: { ...that.state.error, shortBio: true } })
                        }
                    })
            }
            else {
                const error = {
                    ...this.state.error,
                    handle: !handleName,
                    uploadFormalImage: (
                        !prevUploadedFormal ||
                        (newUploadedFormal &&
                            (!newUploadedFormal.type ||
                                newUploadedFormal.type.substring(0, 5) !== "image"))
                    )
                }
                this.setState({ error })
            }
        }
    }

    handleInformalUpdate = () => {
        const {
            handleName,
            nickName,
            wantToBe,
            shortFunBio,
            sports,
            webSeries,
            personalityType,
            uploadChildhoodImage,
            prevUploadedChildhood,
        } = this.state

        const fields = {
            handle_name: handleName,
            nick_name: nickName,
            informal_biography: shortFunBio,
            favourite_series: webSeries.array,
            favourite_sports: sports.array,
            personality_type: personalityType,
            want_to_be: wantToBe,
        }
        const newUploadedChildhood = uploadChildhoodImage.croppedImage ? uploadChildhoodImage.croppedImage : null
        if (handleName !== '' && handleName !== null) {
            if ((newUploadedChildhood || prevUploadedChildhood) &&
                nickName &&
                shortFunBio &&
                personalityType
            ) {
                var formData = new FormData()
                for (const fieldName in fields) {
                    const value = fields[fieldName]
                    if (value !== null) {
                        formData.append(fieldName, value)
                    }
                }

                if (newUploadedChildhood && newUploadedChildhood.type)
                    if (newUploadedChildhood.type.substring(0, 5) == 'image')
                        formData.append('childhood_image', newUploadedChildhood)

                const that = this
                axios({
                    method: this.state.method,
                    url: this.state.URL,
                    data: formData,
                    headers: { ...headers, 'Content-Type': 'multipart/form-data' },
                })
                    .then(function (response) {
                        const isAlumni = response.data.isAlumni
                        that.finishUpdate(that, isAlumni, handleName)
                    })
                    .catch(function (response) {
                        console.log(response)
                        if (response.response.data.informalBiography != null) {
                            that.setState({ error: { ...that.state.error, shortFunBio: true } })
                        }
                    })
            }
            else {
                const error = {
                    ...this.state.error,
                    nickName: !nickName,
                    shortFunBio: !shortFunBio,
                    personalityType: !personalityType,
                    uploadChildhoodImage: (
                        // !prevUploadedChildhood ||
                        (!newUploadedChildhood || (newUploadedChildhood &&
                            (!newUploadedChildhood.type ||
                                newUploadedChildhood.type.substring(0, 5) !== "image")))
                    )
                }
                this.setState({ error })
            }
        } else {
            this.setState({ canAddInformal: true })
        }
    }

    closeModal = (id) => {
        this.setState(currentState => ({
            [id]: {
                ...currentState[id],
                open: false,
            }
        }))
    }
    handleClose = (id) => {
        this.setState(currentState => ({
            [id]: {
                ...currentState[id],
                open: false,
                croppedImageSrc: this.props.uploadedImage[id].croppedImageSrc,
                croppedImage: this.props.uploadedImage[id].croppedImage
            },
            error: {
                ...currentState["error"],
                [id]: false,
            }
        }))
    }
    handleOpen = e => {
        let triggered = e.target.name
        this.setState(currentState => ({
            [triggered]: {
                ...currentState[triggered],
                open: true
            }
        }))
    }

    favOptions = [
        { text: "Sports", value: "sports" },
        { text: "Web Series", value: "webSeries" },
    ]

    render() {
        const options = []
        const linkListOptions = {}
        const currentTheme = this.props.currentTheme
        const formalTheme = currentTheme === 'formal'
        const selectedFavOption = this.state.favourites.selectedOption
        const disableInformal = !formalTheme && !this.state.canAddInformal

        if (this.state.socialLinksOptions.length > 0) {
            for (let i = 0; i < this.state.socialLinksOptions.length; i++) {
                let icon = this.state.socialLinksOptions[i].displayName.toLowerCase()
                if (this.state.socialLinksOptions[i].value == 'oth') {
                    icon = 'globe'
                }
                options.push({
                    key: this.state.socialLinksOptions[i].value,
                    icon: icon,
                    text: this.state.socialLinksOptions[i].displayName,
                    value: this.state.socialLinksOptions[i].value,
                    style: {
                        backgroundColor: '#D5DEF2',
                        border: 'none',
                        color: '#171818',
                    }
                })
                linkListOptions[this.state.socialLinksOptions[i].value] = icon
            }
        }

        if (this.state.loaded) {
            return (
                <div styleName="styles.container"
                    style={{
                        backgroundColor: formalTheme ? '#E3EBFE' : '#1E1E1E',
                    }}>
                    <div styleName="styles.grid">
                        <div styleName="styles.form">
                            {disableInformal &&
                                <Message color='red'>
                                    First fill formal page.
                                </Message>
                            }
                            <div styleName="styles.heading" style={{
                                color: !formalTheme ? '#DEE8FF' : '#171818'
                            }}>
                                <div styleName="styles.profileColumn common.noPadding"></div>
                                <div styleName="styles.profileHead styles.dataColumn">
                                    <div styleName="styles.head">
                                        {this.state.method === 'post'
                                            ? 'Add Member'
                                            : 'Your Profile'}
                                    </div>
                                    <Link to={`${urlAppAddProjectDetails()}`}>
                                        <Button styleName="styles.submit-btn"
                                            style={{
                                                color: formalTheme ? '#000000' : '#E3EBFE',
                                                backgroundColor: formalTheme ? '#E3EBFE' : '#373838',
                                            }}>
                                            Add Project
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                            <div styleName="styles.memberData">
                                <div styleName="styles.profileColumn">
                                    <div style={
                                        formalTheme
                                            ? this.state.uploadFormalImage.croppedImageSrc
                                                ? memberImageStyle(this.state.uploadFormalImage.croppedImageSrc, '24.4rem')
                                                : !this.state.prevUploadedFormal
                                                    ? { display: 'none' }
                                                    : memberImageStyle(this.state.prevUploadedFormal, '24.4rem')

                                            : this.state.uploadChildhoodImage.croppedImageSrc
                                                ? memberImageStyle(this.state.uploadChildhoodImage.croppedImageSrc, '24.4rem')
                                                : !this.state.prevUploadedChildhood
                                                    ? { display: 'none' }
                                                    : memberImageStyle(this.state.prevUploadedChildhood, '24.4rem')
                                    }
                                    />
                                    {(this.state.error.uploadFormalImage || this.state.error.uploadChildhoodImage)
                                        &&
                                        <Message size="mini" color='red'>
                                            Image is required
                                        </Message>}
                                    <div styleName="styles.imgForm">
                                        <Button styleName="styles.submit-btn"
                                            style={{
                                                color: formalTheme ? '#000000' : '#E3EBFE',
                                                backgroundColor: formalTheme ? '#E3EBFE' : '#373838',
                                            }}
                                            onClick={this.handleOpen}
                                            name={formalTheme ? "uploadFormalImage" : "uploadChildhoodImage"}
                                        >
                                            {formalTheme
                                                ? !this.state.prevUploadedFormal
                                                    ? "Add photo"
                                                    : "Change Photo"
                                                : !this.state.prevUploadedChildhood
                                                    ? "Add photo"
                                                    : "Change Photo"}
                                        </Button>

                                        <ImageUploader
                                            aspect={3 / 4}
                                            open={formalTheme ? this.state.uploadFormalImage.open : this.state.uploadChildhoodImage.open}
                                            id={formalTheme ? this.state.uploadFormalImage.id : this.state.uploadChildhoodImage.id}
                                            close={this.closeModal}
                                        />
                                        <div styleName="styles.profileToggle">
                                            <ToggleBtn
                                                setTheme={this.props.setTheme}
                                                formalTheme={this.props.currentTheme === 'formal'}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div styleName="styles.dataColumn">
                                    <Form>
                                        <Form.Field required styleName="styles.labels">
                                            <label
                                                styleName={!formalTheme ? 'styles.darkLables' : ''}
                                            >
                                                {formalTheme ? "Handle name" : "Nick name"}
                                            </label>
                                            <input
                                                required
                                                disabled={disableInformal
                                                    ? true
                                                    : this.state.method === 'patch' && this.state.handleName && formalTheme
                                                        ? true
                                                        : false}
                                                styleName={`styles.inputs ${!formalTheme ? "styles.darkInputs" : ''} `}
                                                placeholder={formalTheme ? "Handle name" : "Nick name"}
                                                onChange={event => {
                                                    this.setState({ error: { ...this.state.error, handle: false } })
                                                    formalTheme
                                                        ? this.setState({
                                                            handleName: event.target.value, error: {
                                                                ...this.state.error,
                                                                handle: false
                                                            }
                                                        })
                                                        : this.setState({
                                                            nickName: event.target.value, error: {
                                                                ...this.state.error,
                                                                nickName: false
                                                            }
                                                        })
                                                }}
                                                value={formalTheme
                                                    ? this.state.handleName
                                                    : this.state.nickName}
                                            />
                                            {this.state.error.handle &&
                                                (<Message size="mini" attached='bottom' color="red">
                                                    {this.state.handleName === ""
                                                        ? "Handle name is required and must be unique."
                                                        : "This Handle already exists"}
                                                </Message>)}
                                            {this.state.error.nickName &&
                                                ((this.state.nickName !== '' && this.state.nickName !== null)
                                                    ? <Message size="mini" color="red" >
                                                        This name is already taken
                                                    </Message>
                                                    : <Message size="mini" color="red" >
                                                        Add a nick name
                                                    </Message>)}
                                        </Form.Field>

                                        <Form.Field required styleName="styles.labels">
                                            <label
                                                styleName={!formalTheme ? 'styles.darkLables' : ''}
                                            >
                                                {formalTheme ? "Short Bio" : "Want to be"}
                                            </label>
                                            <input
                                                styleName={`styles.inputs ${!formalTheme ? "styles.darkInputs" : ''} `}
                                                placeholder={formalTheme ? "Tell us more about you..." : "What you want to be..."}
                                                disabled={disableInformal}
                                                onChange={event => {
                                                    this.setState(formalTheme ? { shortBio: event.target.value } : { wantToBe: event.target.value })
                                                }}
                                                value={formalTheme ? this.state.shortBio : this.state.wantToBe}
                                            />
                                            {this.state.error.shortBio && (
                                                <Message size="mini" attached='bottom' color="red" >
                                                    Maximum 255 characters allowed
                                                </Message>
                                            )}
                                            {this.state.error.wantToBe && (
                                                <Message size="mini" attached='bottom' color="red" >
                                                    {/* note: */}
                                                    TBD
                                                </Message>
                                            )}
                                        </Form.Field>

                                        {formalTheme ?
                                            <Form.Field required styleName="styles.labels">
                                                <label>
                                                    Tech Skills
                                                </label>
                                                <input
                                                    styleName={`styles.inputs`}
                                                    placeholder={this.state.method === 'post' ? "Add tech skill" : "Add new tech skill"}
                                                    name="skills"
                                                    value={this.state.skills.entry}
                                                    onChange={(e) => {
                                                        e.persist()
                                                        this.handleEntryChange(e)
                                                    }}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') {
                                                            this.addEntry(e.target.name)
                                                        }
                                                    }}
                                                />
                                                {this.state.skills.array.map((skill, index) => (
                                                    <div key={index} styleName="styles.lightModeChip common.lightModeChip">
                                                        {skill}
                                                        <Icon name='close'
                                                            styleName="styles.deleteBtn"
                                                            onClick={() => this.deleteEntry("skills", index)} />
                                                    </div>
                                                ))}
                                            </Form.Field>
                                            :
                                            <Form.Field required styleName="styles.labels">
                                                <label
                                                    styleName="styles.darkLables"
                                                >
                                                    Short fun bio
                                                </label>
                                                <input
                                                    styleName={`styles.inputs ${!formalTheme ? "styles.darkInputs" : ''} `}
                                                    disabled={disableInformal}
                                                    placeholder="Some more about you"
                                                    onChange={event => {
                                                        this.setState({ error: { ...this.state.error, shortFunBio: false } })
                                                        this.setState({ shortFunBio: event.target.value })
                                                    }}
                                                    value={this.state.shortFunBio}
                                                />
                                                {this.state.error.shortFunBio &&
                                                    ((this.state.shortFunBio !== '' && this.state.shortFunBio !== null)
                                                        ? <Message size="mini" color="red" >
                                                            Maximum 255 characters are allowed
                                                        </Message>
                                                        : <Message size="mini" color="red" >
                                                            Add this field
                                                        </Message>)}
                                            </Form.Field>
                                        }
                                        {formalTheme ?
                                            <>
                                                <Form.Field required styleName="styles.labels">
                                                    <label>
                                                        Social links
                                                    </label>
                                                    <Dropdown
                                                        styleName="styles.inputs"
                                                        fluid
                                                        search
                                                        selection
                                                        name="site"
                                                        onChange={(_, data) =>
                                                            this.inputSocialLinkChange(_, 'site', data)
                                                        }
                                                        placeholder={this.state.method === 'post'
                                                            ? "Add social media"
                                                            : "Add new social media"}
                                                        options={options}
                                                        value={this.state.socialLinks.site}
                                                    />
                                                    {this.state.errorSite && (
                                                        <Message size="mini" attached='bottom' color="red" >
                                                            The social media site has to be choosen.
                                                        </Message>
                                                    )}
                                                    <input
                                                        styleName={`styles.inputs styles.dropdownInput`}
                                                        placeholder={this.state.method === 'post'
                                                            ? "Add social skill"
                                                            : "Add new social link"}
                                                        name="social"
                                                        onChange={e => this.inputSocialLinkChange(e, 'url')}
                                                        value={this.state.socialLinks.entry}
                                                        onKeyDown={e => {
                                                            if (e.key === 'Enter')
                                                                this.addLink(e)
                                                        }}
                                                    />
                                                    {this.state.errorUrl && (
                                                        <Message size="mini" attached='bottom' color="red" >
                                                            Enter a valid URL
                                                        </Message>
                                                    )}
                                                </Form.Field>
                                                {this.state.socialLinks.array.length > 0 && (
                                                    <LinkList
                                                        linkListOptions={linkListOptions}
                                                        data={this.state.socialLinks.array}
                                                        onDelete={this.deleteSocialLink}
                                                    />
                                                )}


                                                {this.state.method === 'patch' &&
                                                    <Form.Field required styleName="styles.labels">
                                                        <label>
                                                            Add blog link
                                                        </label>
                                                        <input
                                                            styleName={`styles.inputs`}
                                                            placeholder={this.state.method === 'post'
                                                                ? "Add blog link"
                                                                : "Add new blog link"}
                                                            name="newBlog"
                                                            onChange={event => {
                                                                this.setState({
                                                                    newBlog: {
                                                                        ...this.state.newBlog,
                                                                        url: event.target.value,
                                                                        error: false
                                                                    }
                                                                })
                                                            }}
                                                            value={this.state.newBlog.url}
                                                        />
                                                        {this.state.newBlog.error && (
                                                            <Message size="mini" attached='bottom' color="red" >
                                                                Please enter a valid link.
                                                            </Message>
                                                        )}
                                                    </Form.Field>}

                                                <Transition visible={this.state.newBlog.url} animation='fade up' duration={2000}>
                                                    <Form.Field required styleName="styles.labels">
                                                        <label>
                                                            Title of the blog
                                                        </label>
                                                        <input
                                                            styleName={`styles.inputs ${!formalTheme ? "styles.darkInputs" : ''} `}
                                                            onChange={event => {
                                                                this.setState({
                                                                    newBlog: {
                                                                        ...this.state.newBlog,
                                                                        title: event.target.value
                                                                    }
                                                                })
                                                            }}
                                                            value={this.state.newBlog.title}
                                                        />
                                                    </Form.Field>
                                                </Transition>

                                                <Transition visible={this.state.newBlog.title} animation='fade up' duration={2000}>
                                                    <Form.Field required styleName="styles.labels">
                                                        <label>
                                                            Read time
                                                        </label>
                                                        <input
                                                            styleName={`styles.inputs ${!formalTheme ? "styles.darkInputs" : ''} `}
                                                            placeholder="Read time in minutes"
                                                            onChange={event => {
                                                                this.setState({
                                                                    newBlog: {
                                                                        ...this.state.newBlog,
                                                                        readTime: event.target.value
                                                                    }
                                                                })
                                                            }}
                                                            value={this.state.newBlog.readTime}
                                                        />
                                                    </Form.Field>
                                                </Transition>

                                                <Transition visible={this.state.uploadBlogImage.croppedImageSrc} animation='fade up' duration={1000}>
                                                    {this.state.uploadBlogImage.croppedImageSrc &&
                                                        <div styleName="styles.blogDisplayImage">
                                                            <Image src={this.state.uploadBlogImage.croppedImageSrc} style={backgroundImageStyle(this.state.uploadBlogImage.croppedImageSrc)} />
                                                        </div>
                                                    }
                                                </Transition>

                                                <Transition visible={this.state.newBlog.url} animation='fade up' duration={2000}>
                                                    <ImageUploader
                                                        aspect={16 / 9}
                                                        open={this.state.uploadBlogImage.open}
                                                        id={this.state.uploadBlogImage.id}
                                                        close={this.closeModal}
                                                    />
                                                </Transition>

                                                <Transition visible={this.state.newBlog.readTime} animation='fade up' duration={2000}>
                                                    <Button styleName="styles.projectBtn"
                                                        style={{ marginBottom: '2rem' }}
                                                        onClick={this.handleOpen}
                                                        name="uploadBlogImage"
                                                    >
                                                        Add blog display image
                                                    </Button>
                                                </Transition>
                                                {this.state.oldBlogs && this.state.oldBlogs.length > 0 && (
                                                    <LinkList
                                                        linkListOptions={linkListOptions}
                                                        data={this.state.oldBlogs}
                                                        onDelete={this.deleteBlog}
                                                    />
                                                )}
                                            </>
                                            :
                                            <>
                                                <Form.Field required styleName="styles.labels">
                                                    <label
                                                        styleName={!formalTheme ? 'styles.darkLables' : ''}
                                                    >
                                                        Favorites
                                                    </label>
                                                    <div styleName="styles.favChoice">
                                                        <Dropdown
                                                            styleName="styles.favDropdown styles.inputs"
                                                            inline
                                                            name="favourites"
                                                            defaultValue='sports'
                                                            options={this.favOptions}
                                                            onChange={this.handleFavChange}
                                                        />
                                                        <input
                                                            disabled={disableInformal}
                                                            placeholder={selectedFavOption === 'sports' ? "Sport you love..." : "Series you love..."}
                                                            name={selectedFavOption === 'sports' ? "sports" : "webSeries"}
                                                            styleName={`styles.inputs styles.favInput ${!formalTheme ? "styles.darkInputs" : ''} `}
                                                            value={this.state[selectedFavOption].entry}
                                                            onChange={(e) => {
                                                                e.persist()
                                                                this.handleEntryChange(e)
                                                            }}
                                                            onKeyDown={(e) => {
                                                                if (e.key === 'Enter') {
                                                                    e.preventDefault()
                                                                    this.addEntry(e.target.name)
                                                                }
                                                            }}
                                                        />
                                                    </div>
                                                    <div styleName="styles.favourites">
                                                        {selectedFavOption === 'sports'
                                                            ? this.state.sports.array.map((sport, index) => (
                                                                <div key={index} styleName="styles.darkModeChip common.darkModeChip">
                                                                    {sport}
                                                                    <Icon name='close'
                                                                        styleName="styles.deleteBtn"
                                                                        onClick={() => this.deleteEntry(selectedFavOption, index)}
                                                                    />
                                                                </div>
                                                            ))
                                                            :
                                                            this.state.webSeries.array.map((series, index) => (
                                                                <div key={index} styleName="styles.darkModeChip common.darkModeChip">
                                                                    {series}
                                                                    <Icon name='close'
                                                                        styleName="styles.deleteBtn"
                                                                        onClick={() => this.deleteEntry(selectedFavOption, index)}
                                                                    />
                                                                </div>
                                                            ))}
                                                    </div>
                                                </Form.Field>
                                                <Form.Field required styleName="styles.labels">
                                                    <label
                                                        styleName='styles.darkLables'
                                                    >
                                                        Personality Type
                                                    </label>
                                                    <div styleName="styles.personality">
                                                        <Dropdown
                                                            style={{
                                                                backgroundColor: !formalTheme ? '#373838' : '#D5DEF2',
                                                                minWidth: selectedFavOption === 'sports' ? '8rem' : '11rem'
                                                            }}
                                                            disabled={disableInformal}
                                                            styleName="styles.personalityDropdown"
                                                            placeholder='Select your personality'
                                                            selection
                                                            onChange={this.handlePersonalityTypeChange}
                                                            options={personalityTypeOptions}
                                                            value={this.state.personalityType}
                                                            name="personality"
                                                        />
                                                        <Button
                                                            onClick={() => window.open(urlPersonalityTest())}
                                                            styleName="styles.submit-btn"
                                                            style={{
                                                                color: formalTheme ? '#000000' : '#E3EBFE',
                                                                backgroundColor: formalTheme ? '#E3EBFE' : '#373838',
                                                            }}
                                                        >
                                                            Take the Test
                                                        </Button>
                                                    </div>
                                                    {this.state.error.personalityType && (
                                                        <Message size="mini" color="red" >
                                                            Fill this field
                                                        </Message>
                                                    )}
                                                </Form.Field>
                                            </>

                                        }

                                    </Form>
                                    <Button
                                        onClick={this.handleUpdate}
                                        style={{
                                            backgroundColor: formalTheme ? '#171818' : '#E3EBFE',
                                            color: formalTheme ? '#E3EBFE' : '#171818'
                                        }}
                                        styleName="styles.submit-btn"
                                    >
                                        {this.state.method === 'patch' ?
                                            'Update Member' : 'Add Member'}
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div styleName="styles.toggle">
                            <ToggleBtn
                                setTheme={this.props.setTheme}
                                formalTheme={this.props.currentTheme === 'formal'}
                            />
                        </div>
                    </div>
                </div >
            )
        } else {
            return <Loader active size="large" />
        }
    }
}

export default AddMemberDetails
