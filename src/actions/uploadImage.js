export const UPLOAD_CROPPED_IMAGE = 'UPLOAD_CROPPED_IMAGE'


export const uploadCroppedImage = (croppedImage, croppedImageSrc, id) => {
    return {
        type: 'UPLOAD_CROPPED_IMAGE',
        payload: { croppedImage, croppedImageSrc, id },
    }
}
