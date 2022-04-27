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

    const onClick = useCallback(
        (e) => {
            e.stopPropagation()
            dispatch(setActiveFile(files[index].id))
        },
        [index, dispatch, files]
    )

    return (
        <>
            <li className={selectedTab === index ? 'selected' : ''}>
                <button onClick={onClick}>
                    {title}{' '}
                    {unsaved ? (
                        <span
                            style={{
                                height: 20,
                                width: 20,
                                border: '1px solid red',
                            }}
                            onClick={(e) => {
                                e.stopPropagation()
                                return setBlockValidation(files[index].id)
                            }}
                        >
                            o
                        </span>
                    ) : (
                        <span
                            style={{
                                height: 20,
                                width: 20,
                                border: '1px solid red',
                            }}
                            onClick={(e) => {
                                e.stopPropagation()
                                return dispatch(
                                    handleRemoveFile(index, selectedTab)
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
