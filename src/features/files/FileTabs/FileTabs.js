import React, { useState } from 'react'
import FileTabLabel from './FileTabLabel'
import { useSelector } from 'react-redux'
import './FileTabs.css'

function FileTabs({ children }) {
    const files = useSelector((state) => state.files.files)
    const activeFile = useSelector((state) => state.files.activeFile)
    const findFile = files.findIndex((el) => el.id === activeFile)
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
            </ul>
            {children[findFile]}
        </div>
    )
}
export default FileTabs
