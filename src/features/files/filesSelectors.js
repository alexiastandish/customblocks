import { createSelector } from '@reduxjs/toolkit'
import generateNewBlock from '../../utils/generateNewBlock'
import { getBlockEntities } from '../blocks/blocksSlice'
import { getFiles } from './filesSlice'

export const filesSelector = createSelector(
    [getFiles, getBlockEntities],
    (files, blocks) => {
        console.log('FILES', files)
        console.log('blocks', blocks)
        const existingBlocks = []
        Object.entries(blocks).map((block) => {
            console.log('block', block[0])
            if (files.includes(block[0])) {
                console.log('existing block', block[1])
                console.log(block[1])
                existingBlocks.push(block[1])
            }
        })
        return existingBlocks
        // if (activeFiles.length === 0 && ids) {
        //     const newFile = generateNewBlock(ids.length)
        //     return { [newFile.id]: newFile }
        // }
        // return activeFiles
    }
)

// export const filesSelector = (state) => state.files.files

// export const
