import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    files: [],
    activeFile: null,
}

export const filesSlice = createSlice({
    name: 'files',
    initialState,
    reducers: {
        addFile: (state, action) => {
            state.files.push(action.payload)
        },
        setActiveFile: (state, action) => {
            state.activeFile = action.payload
        },
        setFileName: (state, action) => {
            state.activeEditorFile.name = action.payload
        },
    },
})

export const { addFile, setActiveFile, setFileName } = filesSlice.actions

export const getFiles = (state) => state.files.files
