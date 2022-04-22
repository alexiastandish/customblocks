import { blocksAddOne } from '../features/blocks/blocksSlice'
import { setActiveFile, addFile } from '../features/files/filesSlice'
import generateNewBlock from '../utils/generateNewBlock'

export const addNewBlock = () => async (dispatch, getState) => {
    const { blocks, files } = getState()
    console.log('files', files)
    const blocksLength = blocks.ids.length
    console.log('blocksLength', blocksLength)
    const newBlankBlock = { ...generateNewBlock(blocksLength) }

    await dispatch(addFile({ id: newBlankBlock.id, name: newBlankBlock.name }))
    await dispatch(setActiveFile(newBlankBlock.id))

    // await dispatch(
    //     addFile({
    //         id: newBlankBlock.id,
    //         name: newBlankBlock.name,
    //         saved: false,
    //     })
    // )
    // await dispatch(
    //     setActiveFile({ id: newBlankBlock.id, name: newBlankBlock.name })
    // )
    await dispatch(blocksAddOne(newBlankBlock))
}
