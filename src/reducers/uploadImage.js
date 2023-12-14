const initialState = {
    uploadedImage: {},
}

const uploadImage = (state = initialState, action) => {
    switch (action.type) {
        case 'UPLOAD_CROPPED_IMAGE':
            console.log(action.payload)
            return {
                uploadedImage: {
                    ...state.uploadedImage,
                    [action.payload.id]: {
                        croppedImage: action.payload.croppedImage,
                        croppedImageSrc: action.payload.croppedImageSrc
                    }
                },
            }
        default:
            return initialState
    }
}

export default uploadImage