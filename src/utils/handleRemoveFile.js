import { setActiveFile } from 'features/files/filesSlice'
import { removeBlockFile } from 'thunks/remove-file'

export const handleRemoveFile = (
    removedFileIndex,
    activeFileIndex,
    files,
    dispatch
) => {
    if (activeFileIndex === removedFileIndex) {
        if (removedFileIndex === 0) {
            console.log('issue A')
            dispatch(setActiveFile(files[1].id))
            dispatch(removeBlockFile(files[removedFileIndex].id))
        } else {
            console.log('issue b')
            dispatch(setActiveFile(files[removedFileIndex - 1].id))
            dispatch(removeBlockFile(files[removedFileIndex].id))
        }
    } else {
        console.log('issue C')
        dispatch(removeBlockFile(files[removedFileIndex].id))
    }
}
