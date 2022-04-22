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
        removeFile(state, action) {
            state.files.splice(action.payload, 1)
        },
    },
})

export const { addFile, setActiveFile, setFileName, removeFile } =
    filesSlice.actions

export const getFiles = (state) => state.files.files
