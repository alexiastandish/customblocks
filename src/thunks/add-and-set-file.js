import { setActiveFile, addFile } from '../features/files/filesSlice'

export const addAndSetFile = (block) => (dispatch, getState) => {
    const {
        blocks: { files },
    } = getState()
    const fileIsAlreadyActive = files.filter((file) => {
        return file.id === block.id
    })[0]
    if (fileIsAlreadyActive) {
        return dispatch(setActiveFile(block.id))
    }
    dispatch(addFile({ id: block.id, name: block.name }))
    return dispatch(setActiveFile(block.id))
}
