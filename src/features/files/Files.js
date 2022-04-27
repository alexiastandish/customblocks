import React, { useState, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addNewBlock } from '../../thunks/add-new-block'
import { filesSelector } from './filesSelectors'
import FileTab from './FileTabs/FileTab'
import FileTabs from './FileTabs/FileTabs'

function Files(props) {
    const dispatch = useDispatch()
    // const files = useSelector()
    // const activeFiles = useSelector((state) => state.blocks.activeFiles)

    let files = useSelector(filesSelector)
    // if (files.length === 0) {
    //     dispatch(addNewBlock())
    // }

    console.log('files', files)
    return (
        <>
            {files.length > 0 && (
                <FileTabs>
                    {files.map((file) => {
                        console.log('file', file)
                        return (
                            <FileTab key={file.id} title={file.name}>
                                name: {file.name}
                                <br />
                                id: {file.id}
                            </FileTab>
                        )
                    })}
                </FileTabs>
            )}
        </>
    )
}
export default Files
