import { fetchBlock } from '../features/blocks/blocksApi'

export const fetchAndSetResetCode = async (id) => {
    const block = await fetchBlock(id)
    return block
}
