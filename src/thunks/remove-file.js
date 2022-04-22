import { fetchBlock } from '../features/blocks/blocksApi'
import { removeFile } from '../features/files/filesSlice'
import { blockRemove } from '../features/blocks/blocksSlice'

export const removeBlockFile = (id, cb) => async (dispatch, getState) => {
    const {
        files: { files },
    } = getState()
    await fetchBlock(id).then((res) => {
        const position = files.findIndex((el) => el.id === id)
        if (!res) {
            dispatch(removeFile(position))
            dispatch(blockRemove(id))
            if (cb) return cb({ id: null, open: false })
        }
        dispatch(removeFile(position))
        if (cb) return cb({ id: null, open: false })
    })
}
