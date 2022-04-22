import { fetchBlock } from '../features/blocks/blocksApi'
import { removeFile } from '../features/files/filesSlice'
import { blockRemove } from '../features/blocks/blocksSlice'

export const removeBlockFile = (id, cb) => async (dispatch, getState) => {
    const {
        files: { files },
        blocks,
    } = getState()
    console.log('blocks', blocks)
    // removeFile(index)
    console.log('id', id)
    await fetchBlock(id).then((res) => {
        console.log('res', res)
        const position = files.findIndex((el) => el.id === id)
        console.log('position', position)
        if (res) {
        } else {
            dispatch(removeFile(position))
            dispatch(blockRemove(id))
            cb({ id: null, open: false })
        }
    })
}
