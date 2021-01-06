import React, { Component, Fragment } from 'react'
import axios from 'axios'
import { Editor } from '@tinymce/tinymce-react'
import {
  Form,
  Loader,
  Button,
  Container,
  Header,
  TextArea,
  Segment,
  Label,
  Modal,
  Image,
} from 'semantic-ui-react'

import { getCookie, CustomCropper } from 'formula_one'

import getCroppedImage from '../get-cropped-image'
import {
  urlApiTeam,
  urlApiProjects,
  urlAppProjects,
  urlFileManager,
  urlApiNetworkToMedia,
} from '../../urls'
import { IMAGE_STYLE, headers } from '../../consts'

import common from '../../css/page-common-styles.css'

class AddProjectDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      method: 'post',
      url: '',
      profile: [],
      data: {
        slug: '',
        title: '',
        shortDescription: '',
        longDescription: '',
        image: '',
        members: [],
      },
      validImage: true,
      slug: false,
      title: false,
      loaded: false,
      imageCrop: true,
      imageSrc: null,
      pixelCrop: null,
      crop: {
        aspect: 1,
      },
      didYouCrop: false,
      open: false,
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
        })
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

  fileChange = async e => {
    this.setState({
      [e.target.name]: e.target.files[0],
    })
    const imageDataUrl = await readFile(e.target.files[0])
    this.setState({
      imageSrc: imageDataUrl,
      open: true,
    })
  }

  handleEditorChange = content => {
    this.setState({
      data: { ...this.state.data, longDescription: content },
    })
  }

  showCroppedImage = async () => {
    const croppedImage = await getCroppedImage(
      this.state.imageSrc,
      this.state.pixelCrop
    )

    var file = dataURLtoFile(croppedImage, 'image.png')
    this.setState({ croppedImage: file })
  }

  handleChange = e => {
    let name = e.target.name
    this.setState({
      data: {
        ...this.state.data,
        [name]: e.target.value,
      },
    })
  }

  handlePost = () => {
    const { data, croppedImage, prevUploadedImage } = this.state
    let image

    !croppedImage ? (image = false) : (image = true)

    this.setState({
      imageCrop: image,
    })

    if (
      data.longDescription &&
      data.shortDescription &&
      data.slug &&
      data.title &&
      data.members &&
      (croppedImage || prevUploadedImage)
    ) {
      var formData = new FormData()
      formData.append('slug', data.slug)
      formData.append('title', data.title)
      formData.append('short_description', data.shortDescription)
      formData.append('long_description', data.longDescription)
      for(let member=0;member<data.members.length;++member) {
        formData.append('members', Number(data.members[member]));
      }
      if(croppedImage) {
        formData.append('image', croppedImage)
      }

      let that = this

      axios({
        method: this.state.method,
        url: this.state.url,
        data: formData,
        headers: { ...headers, 'Content-Type': 'multipart/form-data' },
      })
        .then(function(response) {
          that.props.history.push(urlAppProjects())
        })
        .catch(function(response) {
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
            that.setState({ validImage: false })
          } else {
            that.setState({ validImage: true })
          }
        })
    }
  }

  handleOpen = () => {
    this.setState({
      open: true,
    })
  }

  handleClose = () => {
    this.setState({
      open: false,
    })
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

  render() {
    const maintainers = this.state.profile.map(user => ({
      image: { avatar: true, src: user.normieImage },
      value: user.maintainer.id,
      text: user.maintainer.person.fullName,
    }))
    if (this.state.loaded) {
      return (
        <Container styleName="common.margin">
          <Header as="h1">
            {this.state.method === 'post' ? 
              'Add Project Details' :
              'Modify Project Details'
            }
          </Header>
          <Form>
            <Form.Field required>
              <label>Title:</label>
              <input
                placeholder="Title for the project"
                name="title"
                value={this.state.data.title}
                onChange={event => {
                  this.handleChange(event)
                }}
              />
              {this.state.title && (
                <Label color="red" pointing>
                  Title with that name already exists
                </Label>
              )}
            </Form.Field>
            <Form.Field required>
              <label>Slug:</label>
              <input
                placeholder="Slug for the project"
                name="slug"
                value={this.state.data.slug}
                onChange={event => {
                  this.handleChange(event)
                }}
              />
              {this.state.slug && (
                <Label color="red" pointing>
                  Slug with that name already exists
                </Label>
              )}
            </Form.Field>

            <Form.Field label="Short Description:" required />

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

            <Form.Field label="Content:" required />
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
                relative_urls : false,
                height: 300,
                width: 'auto',
                menubar: true,
                codesample_languages: [
                  {text: 'HTML/XML', value: 'markup'},
                  {text: 'JavaScript', value: 'javascript'},
                  {text: 'CSS', value: 'css'},
                  {text: 'PHP', value: 'php'},
                  {text: 'Ruby', value: 'ruby'},
                  {text: 'Python', value: 'python'},
                  {text: 'Java', value: 'java'},
                  {text: 'C', value: 'c'},
                  {text: 'C#', value: 'csharp'},
                  {text: 'C++', value: 'cpp'},
                  {text: 'Dart', value: 'dart'},
                  {text: 'Go', value: 'go'},
              ],
                branding: false,
                file_picker_callback: (callback, value, meta) => {
                  this.handleUpload(callback, value, meta)
                },
              }}
              onEditorChange={this.handleEditorChange}
            />
            <Segment basic />
            <Form.Dropdown
              placeholder="Select the Project Makers"
              search
              required
              multiple
              selection
              label="Maintainers:"
              value={this.state.data.members}
              options={maintainers}
              onChange={(event, { value }) => {
                this.setState({
                  data: {
                    ...this.state.data,
                    members: value,
                  },
                })
              }}
            />
            <Form.Field required>
              <label>Image:</label>
              <input
                type="file"
                onChange={this.fileChange}
                name="uploadedFile"
                onClick={this.handleOpen}
              />
            </Form.Field>
            <Modal
              dimmer="blurring"
              size="tiny"
              open={this.state.open}
              onClose={this.handleClose}
            >
              <Modal.Header>Crop project's photo</Modal.Header>
              <Modal.Content image>
                {this.state.imageSrc && (
                  <Fragment>
                    <CustomCropper
                      imageStyle={IMAGE_STYLE}
                      src={this.state.imageSrc}
                      crop={this.state.crop}
                      onChange={crop => {
                        this.setState({ crop })
                      }}
                      onComplete={(crop, pixelCrop) => {
                        this.setState({
                          pixelCrop: pixelCrop,
                          didYouCrop: crop.height && crop.width,
                        }, () =>
                          this.showCroppedImage()
                        )
                      }}
                    />
                  </Fragment>
                )}
              </Modal.Content>
              <Modal.Actions>
                <Button
                  positive
                  disabled={!this.state.didYouCrop}
                  type="submit"
                  onClick={this.handleClose}
                >
                  Done
                </Button>
              </Modal.Actions>
            </Modal>
            {this.state.prevUploadedImage && (
                <Modal
                  trigger={
                    <Button
                      styleName="common.previous-upload-button"
                      basic
                      color="blue"
                    >
                      See previous upload
                    </Button>
                  }
                  dimmer="blurring"
                  size="tiny"
                >
                  <Modal.Header>
                    Previous Project Image
                  </Modal.Header>
                  <Modal.Content image>
                    <Image src={this.state.prevUploadedImage} />
                  </Modal.Content>
                </Modal>
              )}
            <Button
              onClick={this.handlePost}
              positive
              styleName="common.submit-button"
            >
              {this.state.method === 'post' ? 
                'Add Project' :
                'Update Project'
              }
            </Button>
          </Form>
          <Segment basic />
        </Container>
      )
    } else {
      return <Loader active size="large" />
    }
  }
}

function readFile(file) {
  return new Promise(resolve => {
    const reader = new FileReader()
    reader.addEventListener('load', () => resolve(reader.result), false)
    reader.readAsDataURL(file)
  })
}
function dataURLtoFile(dataurl, filename) {
  let arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], filename, { type: mime })
}

export default AddProjectDetails
