import React, { useEffect } from 'react'
import { blocksAddOne, getBlocks } from './blocksSlice'
import { useDispatch, useSelector } from 'react-redux'
import { blocksSelector } from './blocksSelectors'
import { filesSelector } from 'features/files/filesSelectors'
import { setInitialFiles } from '../../thunks/set-initial-files'
import generateNewBlock from '../../utils/generateNewBlock'
import { addAndSetFile } from '../../thunks/add-and-set-file'

function Blocks(props) {
    const dispatch = useDispatch()
    const allBlocks = useSelector((state) =>
        Object.values(state.blocks.entities)
    )
    console.log('allBlocks', allBlocks)
    const files = useSelector(filesSelector)
    useEffect(() => {
        dispatch(getBlocks(allBlocks)).then(({ payload }) => {
            console.log('payload', payload)
            if (files.length === 0) {
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
                {allBlocks &&
                    allBlocks.map((block) => {
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
