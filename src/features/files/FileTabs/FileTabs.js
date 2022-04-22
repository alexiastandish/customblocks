import React, { useState } from 'react'
import FileTabLabel from './FileTabLabel'
import { useDispatch, useSelector } from 'react-redux'
import './FileTabs.css'
import { addNewBlock } from 'thunks/add-new-block'
import { blocksSelector } from '../../blocks/blocksSelectors'

function FileTabs({ children }) {
    const dispatch = useDispatch()
    const files = useSelector((state) => state.files.files)
    const activeFile = useSelector((state) => state.files.activeFile)
    const findFile = files.findIndex((el) => el.id === activeFile)
    const allBlocks = useSelector((state) => blocksSelector.selectAll(state))

    return (
        <div>
            <ul className="tabrow">
                {children.map((item, index) => (
                    <FileTabLabel
                        key={index}
                        title={item.props.title}
                        index={index}
                        files={files}
                        selectedTab={findFile}
                    />
                ))}
                <button onClick={() => dispatch(addNewBlock(allBlocks.length))}>
                    +
                </button>
            </ul>
            {children[findFile]}
        </div>
    )
}
export default FileTabs
