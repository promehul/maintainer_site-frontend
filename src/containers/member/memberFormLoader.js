import { connect } from 'react-redux'

import { uploadCroppedImage } from '../../actions/uploadImage'
import { setTheme } from '../../actions/setTheme'

import AddMemberDetails from '../../components/team/add-update-member/member-form'
import ImageUploadCropper from '../../components/utilComponents/imageUploadCropper'

const mapStateToProps = state => {
    return {
        currentTheme: state.setTheme.theme,
        uploadedImage: state.uploadImage.uploadedImage,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setTheme: (theme) => {
            dispatch(setTheme(theme))
        },
        uploadImage: (croppedImage, croppedImageSrc, id) => {
            dispatch(uploadCroppedImage(croppedImage, croppedImageSrc, id))
        },
    }
}


const MemberDetails = connect(mapStateToProps, mapDispatchToProps)(AddMemberDetails)

const ImageUploader = connect(mapStateToProps, mapDispatchToProps)(ImageUploadCropper)

export { MemberDetails, ImageUploader }
