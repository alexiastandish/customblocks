import { createSelector } from '@reduxjs/toolkit'

export const getBlocks = (state) => state.blocks.entities
export const getActiveFile = (state) => state.blocks.activeFile
export const getExtension = (state) => state.editor.extension

// returns active file block's code from blocks based on the active extension
export const getActiveFileCode = createSelector(
    [getBlocks, getActiveFile, getExtension],
    (blocks, activeFile, extension) => {
        return blocks && blocks[activeFile]?.files[extension]
    }
)
