import React, { Component, Fragment } from 'react'
import axios from 'axios'
import { getCookie, CustomCropper } from 'formula_one'
import {
  Form,
  Button,
  Dropdown,
  Container,
  Header,
  TextArea,
  Segment,
  Label,
  Loader,
  Modal,
  Image,
} from 'semantic-ui-react'

import styles from '../../css/team/add-member-details.css'
import common from '../../css/page-common-styles.css'

import getCroppedImg from '../get-cropped-image'
import LinkList from './linkList'

import {
  urlApiLoggedMaintainer,
  urlApiSocialLink,
  urlAppTeam,
  urlAppAlumni,
} from '../../urls'
import { IMAGE_STYLE, headers } from '../../consts'

class AddMemberDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      method: 'post',
      profile: {},
      disabled: false,
      URL: urlApiLoggedMaintainer(),
      handle: '',
      shortBio: '',
      skills: { array: [], entry: '' },
      socialLinks: { array: [], site: 'git', url: '' },
      errors: {
        music: '',
        book: '',
        film: '',
        game: '',
        hobbies: '',
        skills: '',
      },

      uploadedFileDank: {
        imageSrc: null,
        pixelCrop: null,
        crop: {
          aspect: 1,
        },
        didYouCrop: false,
      },
      uploadedFileNormie: {
        imageSrc: null,
        pixelCrop: null,
        crop: {
          aspect: 1,
        },
        didYouCrop: false,
      },

      prevUploadedFileD: null,
      prevUploadedFileN: null,
      errorHandle: false,
      errorShortBio: false,
      errorUrl: false,
      techSkillsOptions: [],
      socialLinksOptions: [],
      loaded: false,
      normieOpen: false,
      dankOpen: false,
    }
  }
  componentDidMount() {
    const URL1 = urlApiLoggedMaintainer()

    axios.all([axios.get(URL1), axios.options(URL1)]).then(
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
                URL: URL1 + this.state.profile[0].handle + '/',
              })
              this.setState({
                handle: this.state.profile[0].handle,
                shortBio: this.state.profile[0].shortBiography,
                skills: {
                  array: this.state.profile[0].technicalSkills
                    ? this.state.profile[0].technicalSkills.split(',')
                    : [],
                  entry: '',
                },
                prevUploadedFileD: this.state.profile[0].dankImage,
                prevUploadedFileN: this.state.profile[0].normieImage,
              })
              axios.get(urlApiSocialLink()).then(res => {
                this.setState({
                  socialLinks: { ...this.state.socialLinks, array: res.data },
                  loaded: true,
                })
              })
            } else {
              axios.get(urlApiSocialLink()).then(res => {
                this.setState({
                  socialLinks: { ...this.state.socialLinks, array: res.data },
                  loaded: true,
                })
              })
            }
          }
        )
      })
    )
  }

  inputSkillChange = e => {
    this.setState({ skills: { ...this.state.skills, entry: e.target.value } })
  }
  inputSocialLinkChange = (e, name, data = undefined) => {
    this.setState({
      socialLinks: {
        ...this.state.socialLinks,
        [name]: e.target.value === undefined ? data.value : e.target.value,
      },
    })
  }
  addSkills = () => {
    let updatedArray = [...this.state.skills.array, this.state.skills.entry]
    this.setState({
      skills: {
        array: [...new Set(updatedArray)],
        entry: '',
      },
    })
  }
  deleteSkill = id => {
    this.setState({
      skills: {
        array: this.state.skills.array.filter((_, index) => index !== id),
      },
    })
  }
  addLink = e => {
    const that = this
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
          },
        })
      })
      .catch(function(response) {
        if (response.response.data.url != null) {
          that.setState({ errorUrl: true })
        }
      })
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

  fileChange = async e => {
    const name = e.target.name
    const imageDataUrl = await readFile(e.target.files[0])
    this.setState({
      [name]: {
        ...this.state[name],
        imageSrc: imageDataUrl,
      },
    })
  }

  showCroppedImage = async name => {
    const croppedImage = await getCroppedImg(
      this.state[name].imageSrc,
      this.state[name].pixelCrop
    )
    var file = dataURLtoFile(croppedImage, 'image.png')
    this.setState({
      [name]: {
        ...this.state[name],
        croppedImage: file,
      },
    })
  }

  handlePost = () => {
    const {
      handle,
      shortBio,
      skills,
      uploadedFileDank,
      uploadedFileNormie,
      prevUploadedFileD,
      prevUploadedFileN,
    } = this.state

    const uploadedFileD = uploadedFileDank.imageSrc
      ? uploadedFileDank.croppedImage
      : null
    const uploadedFileN = uploadedFileNormie.imageSrc
      ? uploadedFileNormie.croppedImage
      : null
    const skillsArray = skills.array

    if (
      (uploadedFileD || prevUploadedFileD) &&
      (uploadedFileN || prevUploadedFileN) &&
      handle &&
      shortBio
    ) {
      var formData = new FormData()
      formData.append('handle', handle)
      formData.append('short_biography', shortBio)

      formData.append('technical_skills', skillsArray)

      if (uploadedFileN && uploadedFileN.type) {
        if (uploadedFileN.type.substring(0, 5) == 'image') {
          formData.append('normie_image', uploadedFileN)
        }
      }

      if (uploadedFileD && uploadedFileD.type) {
        if (uploadedFileD.type.substring(0, 5) == 'image') {
          formData.append('dank_image', uploadedFileD)
        }
      }

      const that = this
      that.setState({ errorHandle: false })
      that.setState({ errorShortBio: false })
      axios({
        method: this.state.method,
        url: this.state.URL,
        data: formData,
        headers: { ...headers, 'Content-Type': 'multipart/form-data' },
      })
        .then(function(response) {
          // handle success
          const isAlumni = response.data.isAlumni
          if (isAlumni) {
            that.props.history.push(`${urlAppAlumni()}/${handle}`)
          }
          else {
            that.props.history.push(`${urlAppTeam()}/${handle}`)
          }
        })
        .catch(function(response) {
          //handle error
          if (response.response.data.handle != null) {
            that.setState({ errorHandle: true })
          }
          if (response.response.data.shortBiography != null) {
            that.setState({ errorShortBio: true })
          }
        })
    }
  }

  handleClose = e => {
    let triggered = e.target.name
    if (triggered === 'uploadedFileNormie') {
      this.setState({
        normieOpen: false,
      })
    } else if (triggered === 'uploadedFileDank') {
      this.setState({
        dankOpen: false,
      })
    }
  }

  handleOpen = e => {
    let triggered = e.target.name
    if (triggered === 'uploadedFileNormie') {
      this.setState({
        normieOpen: true,
      })
    } else if (triggered === 'uploadedFileDank') {
      this.setState({
        dankOpen: true,
      })
    }
  }

  render() {
    /**
     * Computation to get all social Links from options functions and for other
     * using globe icon
     */
    const options = []
    const linkListOptions = {}
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
      })
      linkListOptions[this.state.socialLinksOptions[i].value] = icon
    }

    if (this.state.loaded) {
      return (
        <div>
          <Container styleName="common.margin">
            <Header as="h1">
              {this.state.method === 'post'
                ? 'Add Member Details'
                : 'Modify Member Details'}
            </Header>
            <Form>
              <Form.Field required>
                <label>Handle Name</label>
                <input
                  placeholder="Handle Name"
                  onChange={event => {
                    this.setState({
                      handle: event.target.value,
                    })
                  }}
                  value={this.state.handle}
                />
                {this.state.errorHandle && (
                  <Label color="red" pointing>
                    This Handle already exists
                  </Label>
                )}
              </Form.Field>

              <Form.Field
                required
                control={TextArea}
                label="Short Bio"
                placeholder="Tell us more about you..."
                onChange={event => {
                  this.setState({
                    shortBio: event.target.value,
                  })
                }}
                value={this.state.shortBio}
              />
              {this.state.errorShortBio && (
                <Label color="red" pointing>
                  Maximum 255 characters allowed
                </Label>
              )}
            </Form>

            <Segment attached="top" styleName="styles.headingBox">
              <h3>Social media links</h3>
            </Segment>
            <Segment textAlign="left" attached="bottom">
              <Form>
                <Form.Field>
                  <label>Site</label>
                  <Dropdown
                    selection
                    name="site"
                    onChange={(_, data) =>
                      this.inputSocialLinkChange(_, 'site', data)
                    }
                    options={options}
                    value={this.state.socialLinks.site}
                  />
                </Form.Field>
                <Form.Field>
                  <Form.Input
                    label="URL"
                    onChange={event => this.inputSocialLinkChange(event, 'url')}
                    value={this.state.socialLinks.url}
                    name="url"
                    placeholder="Add URL ..."
                  />
                  {/* {this.state.errorUrl && (
                    <Label color="red" pointing>
                      Enter a valid URL
                    </Label>
                  )} */}
                </Form.Field>

                <Form.Field>
                  <Button color="blue" name="music" onClick={this.addLink}>
                    Add
                  </Button>
                </Form.Field>
              </Form>
              {this.state.socialLinks.array.length > 0 && (
                <LinkList
                  linkListOptions={linkListOptions}
                  data={this.state.socialLinks.array}
                  deleteSocialLink={this.deleteSocialLink}
                />
              )}
            </Segment>

            <Segment attached="top">
              <span>
                <h3>Tech Skills</h3>
              </span>
            </Segment>
            <Segment textAlign="left" attached="bottom">
              Add your tech skills in a punctuated form. For example, 'Adobe
              Illustrator' or 'Python'. You may visit
              <a href="https://simpleicons.org" target="_blank">
                {' '}
                Simple Icons{' '}
              </a>
              for reference.
              <Form>
                <Form.Field>
                  <Form.Input
                    onChange={this.inputSkillChange}
                    value={this.state.skills.entry}
                    name="skills"
                    placeholder="Add your Skills ..."
                  />
                </Form.Field>

                <Form.Field>
                  <Button color="blue" onClick={this.addSkills}>
                    Add
                  </Button>
                </Form.Field>
              </Form>
              {this.state.skills.array.length > 0 && (
                <LinkList
                  data={this.state.skills.array}
                  name="skills"
                  deleteSkill={this.deleteSkill}
                />
              )}
            </Segment>

            <Form>
              <Form.Field required>
                <label>Normie Image:</label>
                <input
                  type="file"
                  onChange={this.fileChange}
                  name="uploadedFileNormie"
                  onClick={this.handleOpen}
                />
              </Form.Field>
              <Modal
                size="tiny"
                open={this.state.normieOpen}
                onClose={this.handleClose}
              >
                <Modal.Header>
                  Crop <em>Normie</em> Image
                </Modal.Header>
                <Modal.Content image>
                  {this.state.uploadedFileNormie.imageSrc && (
                    <Fragment>
                      <CustomCropper
                        imageStyle={IMAGE_STYLE}
                        src={this.state.uploadedFileNormie.imageSrc}
                        crop={this.state.uploadedFileNormie.crop}
                        onChange={crop => {
                          this.setState({
                            uploadedFileNormie: {
                              ...this.state.uploadedFileNormie,
                              crop: crop,
                            },
                          })
                        }}
                        onComplete={(crop, pixelCrop) => {
                          this.setState({
                            uploadedFileNormie: {
                              ...this.state.uploadedFileNormie,
                              pixelCrop: pixelCrop,
                              didYouCrop: crop.height && crop.width,
                            },
                          }, () => {
                            this.showCroppedImage('uploadedFileNormie')
                          })
                        }}
                      />
                    </Fragment>
                  )}
                </Modal.Content>
                <Modal.Actions>
                  <Button
                    positive
                    disabled={!this.state.uploadedFileNormie.didYouCrop}
                    type="submit"
                    onClick={this.handleClose}
                    name="uploadedFileNormie"
                  >
                    Done
                  </Button>
                </Modal.Actions>
              </Modal>

              {this.state.prevUploadedFileN && (
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
                  size="tiny"
                  dimmer="blurring"
                >
                  <Modal.Header>
                    Previous <em>Normie</em> Image
                  </Modal.Header>
                  <Modal.Content image>
                    <Image src={this.state.prevUploadedFileN} />
                  </Modal.Content>
                </Modal>
              )}

              <Form.Field required>
                <label>Dank Image:</label>
                <input
                  type="file"
                  onChange={this.fileChange}
                  name="uploadedFileDank"
                  onClick={this.handleOpen}
                />
              </Form.Field>
              <Modal
                size="tiny"
                open={this.state.dankOpen}
                onClose={this.handleClose}
              >
                <Modal.Header>
                  Crop <em>Dank</em> Image
                </Modal.Header>
                <Modal.Content image>
                  {this.state.uploadedFileDank.imageSrc && (
                    <Fragment>
                      <CustomCropper
                        imageStyle={IMAGE_STYLE}
                        src={this.state.uploadedFileDank.imageSrc}
                        crop={this.state.uploadedFileDank.crop}
                        onChange={crop => {
                          this.setState({
                            uploadedFileDank: {
                              ...this.state.uploadedFileDank,
                              crop: crop,
                            },
                          })
                        }}
                        onComplete={(crop, pixelCrop) => {
                          this.setState({
                            uploadedFileDank: {
                              ...this.state.uploadedFileDank,
                              pixelCrop: pixelCrop,
                              didYouCrop: crop.width && crop.height,
                            }
                          }, () => {
                            this.showCroppedImage('uploadedFileDank')
                          })
                        }}
                      />
                    </Fragment>
                  )}
                </Modal.Content>
                <Modal.Actions>
                  <Button
                    positive
                    disabled={!this.state.uploadedFileDank.didYouCrop}
                    type="submit"
                    name="uploadedFileDank"
                    onClick={this.handleClose}
                  >
                    Done
                  </Button>
                </Modal.Actions>
              </Modal>

              {this.state.prevUploadedFileD && (
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
                    Previous <em>Dank</em> Image
                  </Modal.Header>
                  <Modal.Content image>
                    <Image src={this.state.prevUploadedFileD} />
                  </Modal.Content>
                </Modal>
              )}

              <Button
                onClick={this.handlePost}
                positive
                styleName="common.submit-button"
              >
                {this.state.method === 'patch' ? 
                  'Update Member' : 'Add Member'}
              </Button>
            </Form>
            <Segment basic />
          </Container>
        </div>
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
export default AddMemberDetails
