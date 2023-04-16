const setTheme = (state = { theme: "formal" }, action) => {
    switch (action.type) {
        case 'SET_THEME':
            return {
                ...state,
                theme: action.payload
            }
        default:
            return state
    }
}

export default setTheme
