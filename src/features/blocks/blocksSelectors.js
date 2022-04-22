import blocksAdapter from './blocksAdapter'

export const blocksSelector = blocksAdapter.getSelectors((state) => {
    return state.blocks || null
})
