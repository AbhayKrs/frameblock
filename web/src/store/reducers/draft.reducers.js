import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userDrafts: [],
}

const draftSlice = createSlice({
    name: 'draft',
    initialState,
    reducers: {
        // Give case reducers meaningful past-tense "event"-style names
        SET_USER_DRAFTS: (state, action) => {
            state.userDrafts = [...action.payload]
        }
    }
})

// `createSlice` automatically generated action creators with these names.
// export them as named exports from this "slice" file
export const { SET_USER_DRAFTS } = draftSlice.actions

// Export the slice reducer as the default export
export default draftSlice.reducer