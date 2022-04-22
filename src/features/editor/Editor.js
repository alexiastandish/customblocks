import React, { useCallback, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getActiveFileCode } from './editorSelectors'
import { debounce } from 'lodash'

// import { debounce } from 'lodash'

// import { getCode, setExtension } from 'features/editor/editor-slice'
import { updateAndPersistCode } from 'thunks/update-and-persist-code'
import { setExtension } from './editorSlice'

function Editor(props) {
    const dispatch = useDispatch()
    const activeFileCode = useSelector(getActiveFileCode)
    console.log('activeFileCode', activeFileCode)
    const [code, setCode] = useState(activeFileCode)

    const debouncedSave = useCallback(
        debounce((newCode) => {
            dispatch(updateAndPersistCode(newCode))
        }, 200),
        []
    )

    const onChange = (e) => {
        e.stopPropagation()
        setCode(e.target.value)
        debouncedSave(e.target.value)
    }

    useEffect(() => {
        console.log('code', code)
        if (activeFileCode !== code) {
            setCode(activeFileCode)
        }
    }, [activeFileCode])

    const setActiveExtension = (lang) => {
        console.log('lang', lang)
        dispatch(setExtension(lang))
    }

    return (
        <div>
            <div>
                <button onClick={() => setActiveExtension('html')}>html</button>
                <button onClick={() => setActiveExtension('css')}>css</button>
                <button onClick={() => setActiveExtension('js')}>js</button>
            </div>
            <textarea
                onChange={(e) => onChange(e)}
                value={code}
                // language={language}
            />
        </div>
    )
}
export default Editor
