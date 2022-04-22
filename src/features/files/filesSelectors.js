import { createSelector } from '@reduxjs/toolkit'
import generateNewBlock from '../../utils/generateNewBlock'
import { getBlocksLength } from '../blocks/blocksSlice'
import { getFiles } from './filesSlice'

// export const filesSelector = createSelector(
//     [getBlocksLength, getFiles],
//     ({ ids }, activeFiles) => {
//         if (activeFiles.length === 0 && ids) {
//             const newFile = generateNewBlock(ids.length)
//             return { [newFile.id]: newFile }
//         }
//         return activeFiles
//     }
// )

export const filesSelector = (state) => state.files.files

// export const
