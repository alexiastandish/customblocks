import { fetchBlock } from '../features/blocks/blocksApi'
import { removeFile } from '../features/files/filesSlice'
import { blockRemove } from '../features/blocks/blocksSlice'

export const removeBlockFile = (id) => async (dispatch, getState) => {
    const {
        files: { files },
    } = getState()
    await fetchBlock(id).then((res) => {
        const position = files.findIndex((el) => el.id === id)
        if (!res) {
            dispatch(blockRemove(id))
            return dispatch(removeFile(position))
        } else {
            dispatch(removeFile(position))
        }
    })
}
