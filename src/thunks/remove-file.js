import { fetchBlock } from '../features/blocks/blocksApi'
import { blockRemove, removeFile } from '../features/blocks/blocksSlice'

export const removeBlockFile = (id) => async (dispatch, getState) => {
    const {
        blocks: { files },
    } = getState()
    await fetchBlock(id).then((res) => {
        console.log('res', res)
        const position = files.findIndex((el) => el.id === id)
        console.log('position', position)
        if (!res) {
            dispatch(blockRemove(id))
            return dispatch(removeFile(position))
        } else {
            dispatch(removeFile(position))
        }
    })
}
