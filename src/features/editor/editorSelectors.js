import { createSelector } from '@reduxjs/toolkit'
import { blocksSelector } from 'features/blocks/blocksSelectors'

const getBlocks = (state) => state.blocks.entities
const getActiveFile = (state) => state.files.activeFile
const getExtension = (state) => state.editor.extension

// returns active file block's code from blocks based on the active extension
export const getActiveFileCode = createSelector(
    [getBlocks, getActiveFile, getExtension],
    (blocks, activeFile, extension) => {
        console.log('blocks[activeFile]', blocks[activeFile])
        return blocks && blocks[activeFile]?.files[extension]
    }
)
