import { createSelector } from '@reduxjs/toolkit'
import generateNewBlock from '../../utils/generateNewBlock'
import { getBlocksLength } from '../blocks/blocksSlice'

// export const filesSelector = createSelector(
//     [getBlocks, getFiles],
//     ({ ids }, activeFiles) => {
//         if (activeFiles.length === 0 && ids) {
//             const newFile = generateNewBlock(ids.length)
//             return { [newFile.id]: newFile }
//         }
//         return activeFiles
//     }
// )

export const getFiles = (state) => state.files.files

// export const
