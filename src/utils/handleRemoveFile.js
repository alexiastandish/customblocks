import { setActiveFile } from 'features/files/filesSlice'
import { removeBlockFile } from 'thunks/remove-file'
import { fetchBlock } from '../features/blocks/blocksApi'
import { blockUpdate } from '../features/blocks/blocksSlice'

export const handleRemoveFile =
    (removedFileIndex, activeFileIndex) => async (dispatch, getState) => {
        const {
            files: { files },
        } = getState()
        if (activeFileIndex !== removedFileIndex) {
            await dispatch(removeBlockFile(files[removedFileIndex].id))
        }
        if (activeFileIndex === removedFileIndex) {
            if (removedFileIndex === 0) {
                if (files.length === 1) {
                    return
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
            if (removedFileIndex === 0 && files.length === 1) {
                dispatch(setActiveFile(files[0].id))
            }

            dispatch(setActiveFile(files[removedFileIndex + 1].id))
        }
    }
