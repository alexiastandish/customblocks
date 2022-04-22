import React, { useCallback, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getActiveFileCode } from './editorSelectors'
import { debounce } from 'lodash'

// import { debounce } from 'lodash'

// import { getCode, setExtension } from 'features/editor/editor-slice'
import { updateAndPersistCode } from 'thunks/update-and-persist-code'
import { setExtension } from './editorSlice'
import { fetchAndSetResetCode } from '../../thunks/fetch-and-set-code'
import { blockUpdate } from '../blocks/blocksSlice'

function Editor(props) {
    const dispatch = useDispatch()
    const activeFileCode = useSelector(getActiveFileCode)
    const extension = useSelector((state) => state.editor.extension)
    const activeFile = useSelector((state) => state.files.activeFile)

    const [code, setCode] = useState(activeFileCode)
    const [initialFiles, setInitialFiles] = useState(null)

    const debouncedSave = useCallback(
        debounce((newCode) => {
            dispatch(updateAndPersistCode(newCode)).then((updatedBlock) => {
                if (updatedBlock.files[extension] !== initialFiles[extension]) {
                    dispatch(
                        blockUpdate({
                            id: activeFile,
                            changes: { ...updatedBlock, unsavedBlock: true },
                        })
                    )
                } else {
                    dispatch(
                        blockUpdate({
                            id: activeFile,
                            changes: { ...updatedBlock, unsavedBlock: false },
                        })
                    )
                }
            })
        }, 200),
        [initialFiles, extension]
    )

    useEffect(() => {
        async function getBlockCode() {
            fetchAndSetResetCode(activeFile).then((res) => {
                if (res) {
                    return setInitialFiles(res.files)
                }
            })
        }
        // }
        getBlockCode()
    }, [activeFile, extension])

    const onChange = (e) => {
        e.stopPropagation()
        setCode(e.target.value)
        debouncedSave(e.target.value)
    }

    useEffect(() => {
        if (activeFileCode !== code) {
            setCode(activeFileCode)
        }
    }, [activeFileCode])

    const setActiveExtension = (lang) => {
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
