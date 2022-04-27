import { setActiveFile } from 'features/files/filesSlice'
import { removeBlockFile } from 'thunks/remove-file'

export const handleRemoveFile =
    (removedFileIndex, activeFileIndex) => async (dispatch, getState) => {
        const {
            files: { files },
        } = getState()
        if (activeFileIndex === removedFileIndex) {
            if (removedFileIndex === 0) {
                if (files.length === 1) {
                    return
                } else {
                    dispatch(removeBlockFile(files[removedFileIndex].id))
                    dispatch(setActiveFile(files[1].id))
                }
            } else {
                await dispatch(removeBlockFile(files[removedFileIndex].id))
                await dispatch(setActiveFile(files[removedFileIndex - 1].id))
            }
        } else {
            if (removedFileIndex === 0 && files.length === 1) {
                console.log('A')
                dispatch(setActiveFile(files[1].id))
            }
            console.log('B')
            dispatch(setActiveFile(files[removedFileIndex + 1].id))
            dispatch(removeBlockFile(files[removedFileIndex].id))
        }
    }
