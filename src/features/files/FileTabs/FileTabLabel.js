import React, { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setActiveFile } from '../filesSlice'

function FileTabLabel({ title, files, index, selectedTab }) {
    const dispatch = useDispatch()

    const onClick = useCallback(() => {
        dispatch(setActiveFile(files[index].id))
    }, [index, dispatch, files])

    return (
        <li className={selectedTab === index ? 'selected' : ''}>
            <button onClick={onClick}>{title}</button>
        </li>
    )
}
export default FileTabLabel
