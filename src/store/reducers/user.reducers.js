import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isSignedIn: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // Give case reducers meaningful past-tense "event"-style names
        handle_isSignedIn(state, action) {
            state.isSignedIn = action.payload;
        },
        userAdded(state, action) {
            const { id, text } = action.payload
            // "Mutating" update syntax thanks to Immer, and no `return` needed
            state.todos.push({
                id,
                text,
                completed: false
            })
        },
    }
})

// `createSlice` automatically generated action creators with these names.
// export them as named exports from this "slice" file
export const { handle_isSignedIn, userAdded } = userSlice.actions

// Export the slice reducer as the default export
export default userSlice.reducer