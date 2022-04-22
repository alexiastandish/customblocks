import React, { useState, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { filesSelector } from './filesSelectors'
import FileTab from './FileTabs/FileTab'
import FileTabs from './FileTabs/FileTabs'

function Files(props) {
    const dispatch = useDispatch()
    const activeFile = useSelector((state) => state.files.activeFile)

    let files = useSelector(filesSelector)

    return (
        <>
            {files.length > 0 && (
                <FileTabs>
                    {Object.entries(files).map(([id, key]) => {
                        return (
                            <FileTab key={id} title={key.name}>
                                name: {key.name}
                                <br />
                                id: {key.id}
                            </FileTab>
                        )
                    })}
                </FileTabs>
            )}
        </>
    )
}
export default Files
