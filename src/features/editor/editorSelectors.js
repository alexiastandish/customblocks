import { createSelector } from '@reduxjs/toolkit'

const getBlocks = (state) => state.blocks.entities
const getBlocksTest = (state) => state.blocks
const getActiveFile = (state) => state.files.activeFile
const getExtension = (state) => state.editor.extension

// returns active file block's code from blocks based on the active extension
export const getActiveFileCode = createSelector(
    [getBlocks, getActiveFile, getExtension, getBlocksTest],
    (blocks, activeFile, extension) => {
        return blocks && blocks[activeFile]?.files[extension]
    }
)
