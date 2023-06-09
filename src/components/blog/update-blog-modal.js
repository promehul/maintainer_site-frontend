import React, { Component } from 'react'
import { Button, Form, Image, Modal } from 'semantic-ui-react'
import axios from 'axios'

import { ImageUploader } from '../../containers/member/memberFormLoader'
import { backgroundImageStyle, headers } from '../../consts'
import { urlApiMaintainerBlog } from '../../urls'

import style from '../../css/team/member-form.css'

class BlogUpdateModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: this.props.data.title,
            readTime: this.props.data.readTime,

            prevDisplayImage: this.props.data.displayImage,
            updateBlogImage: {
                id: 'updateBlogImage',
                croppedImageSrc: null,
                open: false,
            },
        }
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


    closeModal = (id) => {
        this.setState(currentState => ({
            [id]: {
                ...currentState[id],
                open: false,
            }
        }), () => { console.log(this.state) })
    }

    handleBlogUpdate = (guid) => {
        const { title, readTime, prevDisplayImage, updateBlogImage } = this.state
        const newUploadedBlogImage = updateBlogImage.croppedImage ? updateBlogImage.croppedImage : null

        if (
            title &&
            guid &&
            readTime &&
            prevDisplayImage || updateBlogImage
        ) {
            var formData = new FormData()
            formData.append('guid', guid)
            formData.append('read_time', readTime)
            formData.append('title', title)

            if (newUploadedBlogImage && newUploadedBlogImage.type) {
                if (newUploadedBlogImage.type.substring(0, 5) === 'image') {
                    formData.append('display_image', newUploadedBlogImage)
                }
            }


            axios({
                method: 'patch',
                url: urlApiMaintainerBlog(),
                data: formData,
                headers: { ...headers, 'Content-Type': 'multipart/form-data' },
            })
                .then(function (response) {
                    console.log(response)
                })
                .catch(function (error) {
                    console.log(error)
                })
        }
    }

    componentDidUpdate(prevProps) {
        const imageIds = [this.state.updateBlogImage.id]

        if (prevProps.uploadedImage !== this.props.uploadedImage) {
            Object.entries(this.props.uploadedImage).forEach(([id]) => {
                if (imageIds.includes(id)) {
                    this.closeModal(id)
                }
            })
        }
    }

    render() {
        const { data } = this.props
        return (
            <Modal
                onClose={this.props.onClose}
                onOpen={this.props.onOpen}
                open={this.props.open}
            >
                <Modal.Header>Blog Display Image</Modal.Header>
                <Modal.Content image>
                    <div styleName="style.blogDisplayImage">
                        <Image src={data.displayImage} style={
                            this.state.updateBlogImage.croppedImageSrc
                                ? backgroundImageStyle(this.state.updateBlogImage.croppedImageSrc)
                                : !this.state.prevDisplayImage
                                    ? { display: 'none' }
                                    : backgroundImageStyle(this.state.prevDisplayImage)
                        } />
                    </div>
                    <Modal.Description>
                        <Form style={{ padding: '0 2rem' }}>
                            <Form.Field required styleName="style.labels">
                                <label>Title</label>
                                <input
                                    onChange={event => {
                                        this.setState({ title: event.target.value })
                                    }}
                                    name="title"
                                    value={this.state.title}
                                />
                            </Form.Field>
                            <Form.Field required styleName="style.labels">
                                <label>Read time</label>
                                <input
                                    onChange={event => {
                                        this.setState({ readTime: event.target.value })
                                    }}
                                    name="readTime"
                                    value={this.state.readTime}
                                />
                            </Form.Field>
                            <ImageUploader
                                aspect={16 / 9}
                                open={this.state.updateBlogImage.open}
                                id={this.state.updateBlogImage.id}
                                close={this.closeModal}
                            />
                            <Button styleName="style.projectBtn"
                                onClick={this.handleOpen}
                                name={"updateBlogImage"}
                            >
                                Change photo
                            </Button>
                        </Form>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button styleName="style.submit-btn" onClick={() => { this.handleBlogUpdate(data.guid); this.props.onClose() }}>
                        Update blog details
                    </Button>
                </Modal.Actions>
            </Modal>
        )
    }
}

export default BlogUpdateModal