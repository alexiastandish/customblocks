import {
    createSlice,
    createEntityAdapter,
    createAsyncThunk,
} from '@reduxjs/toolkit'

const initialState = {
    files: [],
    activeFile: null,
}

export const filesSlice = createSlice({
    name: 'files',
    initialState,
    reducers: {
        // setFiles: (state, action) => {
        //     console.log('action', action)
        //     if (action.payload.length > 0) {
        //         state.files = action.payload
        //     }
        // },
        // removeFile: (state, action)=> {

        // },
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

// export const
// await dispatch(setActiveFile(newBlankBlock.id))
