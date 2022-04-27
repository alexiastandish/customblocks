import blocksAdapter from './blocksAdapter'

export const blocksSelector = blocksAdapter.getSelectors((state) => {
    return state.blocks || null
})

export const getBlockEntities = (state) => state?.blocks?.entities || []
