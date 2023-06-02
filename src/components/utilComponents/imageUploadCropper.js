import React, { Component, createRef, Fragment } from 'react'
import { Modal } from 'semantic-ui-react'

import { CustomCropper } from 'formula_one'
import { Button, Icon } from 'semantic-ui-react'

import styles from '../../css/utilComponents/imageUploadCropper.css'
import { IMAGE_STYLE } from '../../consts'
import getCroppedImg from '../get-cropped-image'

class ImageUploadCropper extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cropping: false,
            ref: createRef(),
            imageSrc: null,
            pixelCrop: { x: 0, y: 0, width: 283, height: 217 },
            crop: {
                unit: "%",
                x: 0,
                y: 0,
                width: 50,
                height: 50,
                aspect: undefined,
            },
            croppedImageSrc: null,
            imageName: "No image selected",
        }
    }

    triggerInput = () => {
        if (this.props.currentTheme === 'formal')
            this.state.ref.current.click()
        else
            this.state.ref.current.click()
    }

    handleImageUpload = () => {
        if (!this.state.imageSrc)
            this.triggerInput()
        if (!this.state.cropping && this.state.imageSrc)
            this.triggerInput()
        this.setState({ cropping: true })
    }

    readFile(file) {
        if (file && file.type.startsWith('image')) {
            return new Promise(resolve => {
                const reader = new FileReader()
                reader.addEventListener('load', () => resolve(reader.result), false)
                reader.readAsDataURL(file)
            })
        }
    }

    fileChange = async e => {
        const name = e.target.name
        const file = e.target.files[0]
        const imageDataUrl = await this.readFile(file)
        if (file && file.type.startsWith('image')) {
            this.setState({
                imageSrc: imageDataUrl,
                imageName: file.name
            })
        }
        else {
            this.setState({
                cropping: false,
            })
        }
    }

    showPreview = async () => {
        const croppedImage = await getCroppedImg(
            this.state.imageSrc,
            this.state.pixelCrop
        )
        var file = this.dataURLtoFile(croppedImage, 'image.png')
        this.setState({
            croppedImage: file,
            croppedImageSrc: croppedImage
        }, () => {
            console.log(this.props)
            const { croppedImage, croppedImageSrc } = this.state
            this.props.uploadImage(croppedImage, croppedImageSrc, this.props.id)
            this.props.close(this.props.id)
        })
    }

    dataURLtoFile(dataurl, filename) {
        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n)
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n)
        }
        return new File([u8arr], filename, { type: mime })
    }
    render() {
        return (
            <>
                <input
                    hidden
                    type="file"
                    onChange={this.fileChange}
                    ref={this.state.ref}
                />
                <Modal
                    size="mini"
                    open={this.props.open}
                    onClose={() => { this.props.close(this.props.id) }}
                >
                    <Modal.Header>
                        Add Image
                    </Modal.Header>
                    <Modal.Content image>
                        <div styleName="styles.uploadModal" >
                            <div styleName="styles.uploadBtn" onClick={this.handleImageUpload}>
                                {(this.state.imageSrc)
                                    ? this.state.cropping && (
                                        <Fragment>
                                            <CustomCropper
                                                imageStyle={IMAGE_STYLE}
                                                src={this.state.imageSrc}
                                                crop={this.state.crop}
                                                onChange={crop => {
                                                    this.setState({
                                                        crop: crop,
                                                    })
                                                }}
                                                onComplete={(crop, pixelCrop) => {
                                                    this.setState({
                                                        pixelCrop: pixelCrop,
                                                    })
                                                }}
                                            />
                                        </Fragment>
                                    )
                                    : <Icon name='cloud upload' size='huge' />
                                }
                            </div>
                            <div styleName="styles.imageStatus">
                                <div>{this.state.imageName}</div>
                                {this.state.imageName !== 'No image selected'
                                    ? <div>
                                        <Icon name='trash' onClick={() => {
                                            this.setState({
                                                imageName: "No image selected",
                                                croppedImage: null,
                                                croppedImageSrc: null,
                                                imageSrc: null,
                                                cropping: false,
                                            })
                                        }} />
                                    </div> : ''}
                            </div>
                        </div>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button
                            positive
                            type="submit"
                            onClick={(e) => {
                                this.showPreview()
                            }}
                        // name={formalTheme ? 'uploadFormalImage' : 'uploadChildhoodImage'}
                        >
                            Add Image
                        </Button>
                    </Modal.Actions>
                </Modal>
            </>
        )
    }
}
export default ImageUploadCropper
