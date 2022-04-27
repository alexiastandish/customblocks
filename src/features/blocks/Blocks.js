import React, { useEffect } from 'react'
import { blocksAddOne, getBlocks } from './blocksSlice'
import { useDispatch, useSelector } from 'react-redux'
import { getBlockEntities } from './blocksSelectors'
import { setInitialFiles } from '../../thunks/set-initial-files'
import generateNewBlock from '../../utils/generateNewBlock'
import { addAndSetFile } from '../../thunks/add-and-set-file'
import { createSelector } from '@reduxjs/toolkit'
import { getFiles } from '../files/filesSelectors'

export const getSidebarBlocks = createSelector(
    [getBlockEntities, getFiles],
    (blocks, files) => {
        console.log('files', files)
        const filteredBlocks = []
        Object.values(blocks).map((block) => {
            if (!block.unsavedBlock) {
                filteredBlocks.push(block)
            }
        })
        return filteredBlocks
    }
)

function Blocks(props) {
    const dispatch = useDispatch()
    const allBlocks = useSelector((state) =>
        Object.values(state.blocks.entities)
    )
    const sidebarBlocks = useSelector(getSidebarBlocks)
    console.log('sidebarBlocks', sidebarBlocks)
    const files = useSelector(getFiles)
    useEffect(() => {
        dispatch(getBlocks(allBlocks)).then(({ payload }) => {
            if (files.length === 0) {
                console.log('hi')
                const blocksLength = Object.values(payload).length
                const newBlankBlock = generateNewBlock(blocksLength)

                dispatch(blocksAddOne(newBlankBlock))
                dispatch(setInitialFiles(newBlankBlock))
            }
        })
    }, [dispatch, files.allBlocks])

    return (
        <div>
            <ul>
                DB BLOCKS
                {sidebarBlocks &&
                    sidebarBlocks.map((block) => {
                        if (!block.unsavedBlock) {
                            return (
                                <li
                                    onClick={() =>
                                        dispatch(addAndSetFile(block))
                                    }
                                    key={block.id}
                                >
                                    {block.name}{' '}
                                </li>
                            )
                        }
                    })}
            </ul>
        </div>
    )
}

export default Blocks
