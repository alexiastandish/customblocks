import React, { useEffect, useState } from 'react'
import { blocksAddOne, blocksSetAll, getBlocks } from './blocksSlice'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBlocks } from './blocksApi'
import { blocksSelector } from './blocksSelectors'
import defaultBlock from './default-block.json'
import { addNewBlock } from '../../thunks/add-new-block'
import generateNewBlock from '../../utils/generateNewBlock'

function Blocks(props) {
    const dispatch = useDispatch()
    const allBlocks = useSelector((state) => blocksSelector.selectAll(state))

    useEffect(() => {
        dispatch(getBlocks()).then(({ payload }) => {
            console.log('res', payload)
            const blocksLength = Object.values(payload).length
            const newBlankBlock = generateNewBlock(blocksLength)
            console.log('newBlankBlock', newBlankBlock)
            dispatch(blocksAddOne(newBlankBlock))
        })
    }, [dispatch])

    const resetBlocks = async () => {
        fetchBlocks().then((res) => {
            // dispatch(removeActiveFile(files.active))
            dispatch(blocksSetAll(res))
        })
    }

    return (
        <div>
            <button onClick={() => dispatch(addNewBlock())}>Add block</button>
            <button onClick={() => resetBlocks()}>reset</button>
            <ul>
                FILES
                {allBlocks &&
                    allBlocks.map((block) => {
                        return <li key={block.id}>{block.name} </li>
                    })}
            </ul>

            <ul>
                DB BLOCKS
                {allBlocks &&
                    allBlocks.map((block) => {
                        if (!block.unsavedBlock) {
                            return <li key={block.id}>{block.name} </li>
                        }
                    })}
            </ul>
        </div>
    )
}

export default Blocks
