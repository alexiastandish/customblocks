import { blocksAddOne } from '../features/blocks/blocksSlice'
import { setActiveFile, addFile } from '../features/files/filesSlice'
import generateNewBlock from '../utils/generateNewBlock'

export const addNewBlock = (blocksLength) => async (dispatch, getState) => {
    const newBlankBlock = { ...generateNewBlock(blocksLength) }
    await dispatch(addFile({ id: newBlankBlock.id, name: newBlankBlock.name }))
    await dispatch(setActiveFile(newBlankBlock.id))

    await dispatch(blocksAddOne(newBlankBlock))
}
