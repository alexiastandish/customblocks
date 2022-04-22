import React, { useEffect } from 'react'
import { blocksAddOne, getBlocks } from './blocksSlice'
import { useDispatch, useSelector } from 'react-redux'
import { blocksSelector } from './blocksSelectors'
import { setInitialFiles } from '../../thunks/set-initial-files'
import generateNewBlock from '../../utils/generateNewBlock'
import { addAndSetFile } from '../../thunks/add-and-set-file'

function Blocks(props) {
    const dispatch = useDispatch()
    const allBlocks = useSelector((state) => blocksSelector.selectAll(state))

    useEffect(() => {
        dispatch(getBlocks(allBlocks)).then(({ payload }) => {
            const blocksLength = Object.values(payload).length
            const newBlankBlock = generateNewBlock(blocksLength)
            dispatch(blocksAddOne(newBlankBlock))
            dispatch(setInitialFiles(newBlankBlock))
        })
    }, [dispatch])

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
