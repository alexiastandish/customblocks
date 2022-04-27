import { fetchBlock } from '../features/blocks/blocksApi'
import { removeFile, setActiveFile } from '../features/files/filesSlice'
import { blockRemove } from '../features/blocks/blocksSlice'

export const removeBlockFile = (id) => async (dispatch, getState) => {
    const {
        files: { files },
    } = getState()
    await fetchBlock(id).then(async (res) => {
        const position = files.findIndex((el) => el.id === id)
        if (!res) {
            dispatch(removeFile(position))
            return dispatch(blockRemove(id))
        } else {
            await dispatch(removeFile(position))
            // await dispatch(setActiveFile(files[files.length - 1].id))

            // dispatch(setActiveFile(block.id))
        }
    })
}
