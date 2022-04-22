import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { handleRemoveFile } from '../../../utils/handleRemoveFile'
import { setActiveFile } from '../filesSlice'

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

    return (
        <>
            <li className={selectedTab === index ? 'selected' : ''}>
                <button onClick={onClick}>
                    {title}{' '}
                    {unsaved ? (
                        <span
                            onClick={() => setBlockValidation(files[index].id)}
                        >
                            o
                        </span>
                    ) : (
                        <span
                            onClick={() => {
                                return handleRemoveFile(
                                    index,
                                    selectedTab,
                                    files,
                                    dispatch
                                )
                            }}
                        >
                            x
                        </span>
                    )}
                </button>
            </li>
        </>
    )
}
export default FileTabLabel
