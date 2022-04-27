import defaultBlock from '../features/blocks/default-block.json'

const generateNewBlock = (blocksLength) => {
    const newBlockFiles = {
        ...defaultBlock,
        name: `block ${blocksLength + 1}`,
        id: `merchant-name:${blocksLength + 1}`,
    }

    return newBlockFiles
}

export default generateNewBlock
