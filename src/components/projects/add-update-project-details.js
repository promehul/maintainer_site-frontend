import React, { Component, Fragment } from 'react'
import axios from 'axios'
import { Editor } from '@tinymce/tinymce-react'
import {
    Form,
    Loader,
    Button,
    TextArea,
    Segment,
    Label,
    Message,
} from 'semantic-ui-react'

import {
    urlApiTeam,
    urlApiProjects,
    urlAppProjects,
    urlFileManager,
    urlApiNetworkToMedia,
} from '../../urls'

import { headers, memberImageStyle } from '../../consts'

import styles from '../../css/projects/project-form.css'
import common from '../../css/page-common-styles.css'

import { ImageUploader } from '../../containers/member/memberFormLoader'

class AddProjectDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            method: 'post',
            url: '',
            maintainers: {},
            data: {
                slug: '',
                title: '',
                shortDescription: '',
                longDescription: '',
                image: '',
                members: [],
            },
            slug: false,
            image: true,
            title: false,
            loaded: false,
            members: true,

            uploadImage: {
                id: 'uploadImage',
                open: false,
                croppedImageSrc: null,
            },

            prevUploadedImage: null,
        }
    }

    componentDidMount() {
        const slug = this.props.match.params.slug
        if (slug !== undefined) {
            axios.all([
                axios.get(`${urlApiProjects()}${slug}/`),
                axios.get(urlApiTeam()),
            ])
                .then(axios.spread((initialData, teamMembers) => {
                    initialData = initialData.data
                    console.log(teamMembers.data)
                    this.setState({
                        method: 'patch',
                        profile: teamMembers.data,
                        loaded: true,
                        url: `${urlApiProjects()}${slug}/`,
                        data: {
                            ...this.state.data,
                            members: initialData.members,
                            title: initialData.title,
                            slug: initialData.slug,
                            longDescription: initialData.longDescription,
                            shortDescription: initialData.shortDescription,
                        },
                        prevUploadedImage: initialData.image,
                    }, () => console.log("FKDJFDKFJ\n\n"));

                }))
        }
        else {
            axios.get(urlApiTeam()).then(res => {
                this.setState({
                    method: 'post',
                    url: `${urlApiProjects()}`,
                    profile: res.data,
                    loaded: true,
                })
            })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const { uploadImage } = this.state
        const imageIds = [uploadImage.id]

        if (prevProps.uploadedImage !== this.props.uploadedImage) {
            this.state.image = true
            Object.entries(this.props.uploadedImage).forEach(([id]) => {
                if (imageIds.includes(id)) {
                    this.handleClose(id)
                }
            })
        }

        if (prevState.profile !== this.state.profile) {
            this.updateMaintainers(this.state.profile);
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

    handleEditorChange = content => {
        this.setState({
            data: { ...this.state.data, longDescription: content },
        })
    }

    handleChange = e => {
        let name = e.target.name
        this.setState({
            [name]: false,
            data: {
                ...this.state.data,
                [name]: e.target.value,
            },
        })
    }

    handlePost = () => {
        const { data, prevUploadedImage, uploadImage } = this.state
        if (
            data.longDescription &&
            data.shortDescription &&
            data.slug &&
            data.title &&
            data.members &&
            (uploadImage || prevUploadedImage)
        ) {
            const newImage = uploadImage.croppedImage
                ? uploadImage.croppedImage : null

            var formData = new FormData()
            formData.append('slug', data.slug)
            formData.append('title', data.title)
            formData.append('short_description', data.shortDescription)
            formData.append('long_description', data.longDescription)
            for (let member = 0; member < data.members.length; ++member) {
                formData.append('members', Number(data.members[member]))
            }
            if (newImage && newImage.type && newImage.type.substring(0, 5) == 'image')
                formData.append('image', newImage)

            let that = this

            axios({
                method: this.state.method,
                url: this.state.url,
                data: formData,
                headers: { ...headers, 'Content-Type': 'multipart/form-data' },
            })
                .then(function (response) {
                    that.props.history.push(urlAppProjects())
                })
                .catch(function (response) {
                    if (response.response.data.slug != null) {
                        that.setState({ slug: true })
                    } else {
                        that.setState({ slug: false })
                    }
                    if (response.response.data.title != null) {
                        that.setState({ title: true })
                    } else {
                        that.setState({ title: false })
                    }
                    if (response.response.data.image != null) {
                        that.setState({ image: false })
                    } else {
                        that.setState({ image: true })
                    }
                    if (response.response.data.members != null) {
                        that.setState({ members: false })
                    } else {
                        that.setState({ members: true })
                    }
                })
        }
    }

    handleUpload = (callback, value, meta) => {
        let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
        width=1000px,height=500px,left=100px,top=100px`
        window.open(urlFileManager(), 'title', params)
        window.addEventListener('message', event => {
            const { path, filemanager_name } = event.data
            const data = {
                path,
                filemanager_name,
            }
            if (path) {
                axios({
                    method: 'post',
                    url: urlApiNetworkToMedia(),
                    data: data,
                    headers: { ...headers, 'Content-Type': 'application/json' },
                }).then(response => {
                    const { path } = response.data
                    callback(path)
                })
            }
        })
    }

    updateMaintainers(profileData) {
        const maintainers = profileData.map(user => ({
            image: { avatar: true, src: user.normieImage },
            value: user.maintainer.id,
            text: user.maintainer.person.fullName,
        }));

        this.setState({ maintainers });
    }


    render() {
        if (this.state.loaded) {
            return (
                <div styleName="styles.container"
                    style={{
                        backgroundColor: '#E3EBFE',
                    }}>
                    <div styleName="styles.grid">
                        <div styleName="styles.form">
                            <div styleName="styles.heading" style={{
                                color: '#171818'
                            }}>
                                <div styleName="styles.profileColumn common.noPadding"></div>
                                <div styleName="styles.profileHead styles.dataColumn">
                                    <div styleName="styles.head">
                                        {this.state.method === 'post'
                                            ? 'Add Project Details' :
                                            'Modify Project Details'}
                                    </div>
                                </div>
                            </div>
                            <div styleName="styles.memberData">
                                <div styleName="styles.profileColumn">
                                    <div style={
                                        this.state.uploadImage.croppedImageSrc
                                            ? memberImageStyle(this.state.uploadImage.croppedImageSrc, '17rem')
                                            : !this.state.prevUploadedImage
                                                ? { display: 'none' }
                                                : memberImageStyle(this.state.prevUploadedImage, '17rem')
                                    } />
                                    {(this.state.image == false)
                                        &&
                                        <Message size="mini" color='red'>
                                            Image is required
                                        </Message>}
                                    <div styleName="styles.imgForm">
                                        <Button styleName="styles.submit-btn"
                                            style={{
                                                color: '#000000',
                                                backgroundColor: '#E3EBFE',
                                            }}
                                            onClick={this.handleOpen}
                                            name={"uploadImage"}
                                        >
                                            {!this.state.prevUploadedImage
                                                ? "Add photo"
                                                : "Change Photo"}
                                        </Button>

                                        <ImageUploader
                                            aspect={1 / 1}
                                            open={this.state.uploadImage.open}
                                            id={this.state.uploadImage.id}
                                            close={this.closeModal}
                                        />
                                    </div>
                                </div>
                                <div styleName="styles.dataColumn">
                                    <Form>
                                        <div>
                                            <Form.Field required styleName="styles.labels">
                                                <label>
                                                    Title:
                                                </label>
                                                <input
                                                    required
                                                    placeholder="Title for the project"
                                                    name="title"
                                                    value={this.state.data.title}
                                                    styleName="styles.inputs"
                                                    onChange={event => {
                                                        this.handleChange(event)
                                                    }}
                                                />
                                            </Form.Field>

                                            <Form.Field required styleName="styles.labels">
                                                <label>
                                                    Slug:
                                                </label>
                                                <input
                                                    required
                                                    placeholder="Slug for the project"
                                                    name="slug"
                                                    value={this.state.data.slug}
                                                    styleName="styles.inputs"
                                                    onChange={event => {
                                                        this.handleChange(event)
                                                    }}
                                                />
                                            </Form.Field>
                                            {this.state.slug && (
                                                <Label color="red" pointing>
                                                    Slug with that name already exists
                                                </Label>
                                            )}

                                            <Form.Field styleName="styles.labels" label="Short Description:" required />
                                            <Form.Field
                                                control={TextArea}
                                                placeholder="Short Description for the project..."
                                                name="shortDescription"
                                                value={this.state.data.shortDescription}
                                                onChange={event => {
                                                    this.handleChange(event)
                                                }}
                                            />

                                            {this.state.data.shortDescription.length > 255 && (
                                                <Label color="red" pointing>
                                                    ShortDescription cannot be more than 255
                                                </Label>
                                            )}

                                            <Form.Field styleName="styles.labels" label="Content:" required />
                                            <Editor
                                                initialValue={this.state.data.longDescription}
                                                init={{
                                                    plugins:
                                                        'contextmenu ' +
                                                        ' lists link table image codesample emoticons code charmap ' +
                                                        ' fullscreen ' +
                                                        ' wordcount',
                                                    contextmenu:
                                                        'bold italic underline strikethrough | ' +
                                                        'superscript subscript | ' +
                                                        'link',
                                                    toolbar1:
                                                        'formatselect | ' +
                                                        'bold italic underline strikethrough blockquote removeformat | ' +
                                                        'alignleft aligncenter alignright alignjustify',
                                                    toolbar2:
                                                        'undo redo | ' +
                                                        'bullist numlist outdent indent | ' +
                                                        'link unlink | ' +
                                                        'table image codesample charmap | ' +
                                                        'fullscreen',
                                                    toolbar3:
                                                        'fontselect fontsizeselect | emoticons',
                                                    relative_urls: false,
                                                    height: 300,
                                                    width: 'auto',
                                                    menubar: true,
                                                    codesample_languages: [
                                                        { text: 'HTML/XML', value: 'markup' },
                                                        { text: 'JavaScript', value: 'javascript' },
                                                        { text: 'CSS', value: 'css' },
                                                        { text: 'PHP', value: 'php' },
                                                        { text: 'Ruby', value: 'ruby' },
                                                        { text: 'Python', value: 'python' },
                                                        { text: 'Java', value: 'java' },
                                                        { text: 'C', value: 'c' },
                                                        { text: 'C#', value: 'csharp' },
                                                        { text: 'C++', value: 'cpp' },
                                                        { text: 'Dart', value: 'dart' },
                                                        { text: 'Go', value: 'go' },
                                                    ],
                                                    branding: false,
                                                    file_picker_callback: (callback, value, meta) => {
                                                        this.handleUpload(callback, value, meta)
                                                    },
                                                }}
                                                onEditorChange={this.handleEditorChange}
                                            />
                                            <Segment basic />
                                            {this.state.maintainers.length > 0 && (
                                                <Form.Dropdown
                                                    styleName="styles.labels"
                                                    placeholder="Select the Project Makers"
                                                    search
                                                    required
                                                    multiple
                                                    selection
                                                    label="Maintainers:"
                                                    value={this.state.data.members}
                                                    options={this.state.maintainers}
                                                    onChange={(event, { value }) => {
                                                        this.setState({
                                                            members: false,
                                                            data: {
                                                                ...this.state.data,
                                                                members: value,
                                                            },
                                                        })
                                                    }}
                                                />)}
                                        </div>
                                    </Form>
                                    <Button
                                        onClick={this.handlePost}
                                        style={{
                                            backgroundColor: '#171818',
                                            color: '#E3EBFE'
                                        }}
                                        styleName="styles.submit-btn"
                                    >
                                        {this.state.method === 'patch' ?
                                            'Update Project' : 'Add Project'}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return <Loader active size="large" />
        }
    }
}

export default AddProjectDetails
