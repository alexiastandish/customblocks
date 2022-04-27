import { blockUpdate } from 'features/blocks/blocksSlice'

export const updateAndPersistCode = (newCode) => async (dispatch, getState) => {
    const {
        blocks,
        files: { activeFile },
        editor: { extension },
    } = getState()
    const updatedBlock = {
        ...blocks.entities[activeFile],
        files: {
            ...blocks.entities[activeFile].files,
            [extension]: newCode,
        },
    }

    await dispatch(blockUpdate({ id: activeFile, changes: updatedBlock }))
    return updatedBlock
}
