import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    extension: 'html',
    errors: null,
    // code: '',
}

export const editorSlice = createSlice({
    name: 'editor',
    initialState,
    reducers: {
        // setCode: (state, action) => {
        //     state.code = action.payload
        // },
        setExtension: (state, action) => {
            state.extension = action.payload
        },
    },
})

export const { setExtension } = editorSlice.actions
