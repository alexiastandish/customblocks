import { setActiveFile } from 'features/files/filesSlice'
import { removeBlockFile } from 'thunks/remove-file'
import { fetchBlock } from '../features/blocks/blocksApi'
import { blockUpdate } from '../features/blocks/blocksSlice'

export const handleRemoveFile =
    (removedFileIndex, activeFileIndex) => async (dispatch, getState) => {
        const {
            files: { files },
        } = getState()
        if (activeFileIndex === removedFileIndex) {
            if (removedFileIndex === 0) {
                console.log('12')
                if (files.length === 1) {
                    // console.log('14')
                    // debugger
                    return
                } else {
                    // console.log('17')
                    // debugger
                    dispatch(removeBlockFile(files[removedFileIndex].id))
                    dispatch(setActiveFile(files[1].id))
                }
            } else {
                const id = files[removedFileIndex].id

                await dispatch(removeBlockFile(files[removedFileIndex].id))
                await dispatch(setActiveFile(files[removedFileIndex - 1].id))
                const revertedBlock = await fetchBlock(id)

                if (revertedBlock) {
                    return dispatch(
                        blockUpdate({
                            id,
                            changes: {
                                ...revertedBlock,
                                unsavedChanges: false,
                                unsavedBlock: false,
                            },
                        })
                    )
                }
            }
        } else {
            console.log('27')
            // debugger
            if (removedFileIndex === 0 && files.length === 1) {
                // debugger
                dispatch(setActiveFile(files[0].id))
            }

            dispatch(setActiveFile(files[removedFileIndex + 1].id))
            // dispatch(removeBlockFile(files[removedFileIndex].id))
        }
    }
