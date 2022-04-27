import { blocksAddOne } from '../features/blocks/blocksSlice'
import { setActiveFile, addFile } from '../features/files/filesSlice'
import generateNewBlock from '../utils/generateNewBlock'

export const addNewBlock = () => async (dispatch, getState) => {
    const { blocks } = getState()
    const blocksArray = Object.values(blocks.entities)
    const blocksLastIndexId = blocksArray[blocksArray.length - 1].id
    const currentIdValue = Number(
        blocksLastIndexId.replace('merchant-name:', '')
    )

    const newBlankBlock = { ...generateNewBlock(currentIdValue) }
    await dispatch(blocksAddOne(newBlankBlock))
    await dispatch(addFile({ id: newBlankBlock.id, name: newBlankBlock.name }))
    await dispatch(setActiveFile(newBlankBlock.id))
}
