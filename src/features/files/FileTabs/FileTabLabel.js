import React, { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { removeBlockFile } from '../../../thunks/remove-file'
import { setActiveFile, removeFile } from '../filesSlice'

function FileTabLabel({
    title,
    files,
    index,
    selectedTab,
    unsaved,
    setBlockValidation,
}) {
    const dispatch = useDispatch()

    const onClick = useCallback(() => {
        dispatch(setActiveFile(files[index].id))
    }, [index, dispatch, files])

    console.log('files', files)
    return (
        <>
            <li className={selectedTab === index ? 'selected' : ''}>
                <button onClick={onClick}>{title}</button>
                {unsaved ? (
                    <span onClick={() => setBlockValidation(files[index].id)}>
                        o
                    </span>
                ) : (
                    <span
                        onClick={() => {
                            const removedFileIndex = index
                            const activeFileIndex = selectedTab

                            if (activeFileIndex === removedFileIndex) {
                                if (removedFileIndex === 0) {
                                    dispatch(setActiveFile(files[1].id))
                                }
                                dispatch(
                                    setActiveFile(
                                        files[removedFileIndex - 1].id
                                    )
                                )
                            }
                            dispatch(removeBlockFile(files[index].id))
                        }}
                    >
                        x
                    </span>
                    // <span onClick={() => dispatch(removeFile(index))}>x</span>
                )}
            </li>
        </>
    )
}
export default FileTabLabel
