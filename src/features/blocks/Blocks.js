import React, { useEffect, useState } from 'react'
import { blocksAddOne, blocksSetAll, getBlocks } from './blocksSlice'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBlocks } from './blocksApi'
import { blocksSelector } from './blocksSelectors'
import { addNewBlock } from '../../thunks/add-new-block'
import { setInitialFiles } from '../../thunks/set-initial-files'
import generateNewBlock from '../../utils/generateNewBlock'
import { addFile, setActiveFile } from '../files/filesSlice'
import { addAndSetFile } from '../../thunks/add-and-set-file'

function Blocks(props) {
    const dispatch = useDispatch()
    const allBlocks = useSelector((state) => blocksSelector.selectAll(state))

    useEffect(() => {
        dispatch(getBlocks()).then(({ payload }) => {
            const blocksLength = Object.values(payload).length
            const newBlankBlock = generateNewBlock(blocksLength)
            dispatch(blocksAddOne(newBlankBlock))
            dispatch(setInitialFiles(newBlankBlock))
        })
    }, [dispatch])

    // const resetBlocks = async () => {
    //     fetchBlocks().then((res) => {
    //         dispatch(blocksSetAll(res))
    //     })
    // }

    return (
        <div>
            <button onClick={() => dispatch(addNewBlock(allBlocks.length))}>
                Add block
            </button>
            {/* <button onClick={() => resetBlocks()}>reset</button> */}
            {/* <ul>
                FILES
                {allBlocks &&
                    allBlocks.map((block) => {
                        return <li key={block.id}>{block.name} </li>
                    })}
            </ul> */}

            <ul>
                DB BLOCKS
                {allBlocks &&
                    allBlocks.map((block) => {
                        if (!block.unsavedBlock) {
                            return (
                                <li
                                    // onClick={(e) => {
                                    //     return dispatch(
                                    //         addFile({
                                    //             id: block.id,
                                    //             name: block.name,
                                    //         })
                                    //     )
                                    // }}
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
