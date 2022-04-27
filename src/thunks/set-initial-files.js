import { addFile, setActiveFile } from '../features/files/filesSlice'

export const setInitialFiles = (newBlock) => (dispatch, getState) => {
    const { files } = getState()
    console.log('files', files)
    if (!files.activeFile) {
        dispatch(addFile({ id: newBlock.id, name: newBlock.name }))
        dispatch(setActiveFile(newBlock.id))
    }
}
