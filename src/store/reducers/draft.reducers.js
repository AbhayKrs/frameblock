import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const draftSlice = createSlice({
    name: 'draft',
    initialState,
    reducers: {
        // Give case reducers meaningful past-tense "event"-style names
        draftAdded(state, action) {
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
export const { draftAdded } = draftSlice.actions

// Export the slice reducer as the default export
export default draftSlice.reducer