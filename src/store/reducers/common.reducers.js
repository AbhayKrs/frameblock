import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    theme: 'dark'
}

const commonSlice = createSlice({
    name: 'common',
    initialState,
    reducers: {
        // Give case reducers meaningful past-tense "event"-style names
        switchTheme(state, action) {
            state.theme = action.payload;
        },
        commonAdded(state, action) {
            const { id, text } = action.payload
            // "Mutating" update syntax thanks to Immer, and no `return` needed
            state.todos.push({
                id,
                text,
                completed: false
            })
        }
    }
})

// `createSlice` automatically generated action creators with these names.
// export them as named exports from this "slice" file
export const { switchTheme, commonAdded } = commonSlice.actions

// Export the slice reducer as the default export
export default commonSlice.reducer