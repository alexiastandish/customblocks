import React, { useCallback, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getActiveFileCode } from './editorSelectors'
import { debounce } from 'lodash'
import { updateAndPersistCode } from 'thunks/update-and-persist-code'
import { setExtension } from './editorSlice'
import { fetchAndSetResetCode } from '../../thunks/fetch-and-set-code'
import { blockUpdate } from '../blocks/blocksSlice'
import styled from 'styled-components'

function Editor(props) {
    // TODO: This file is a WIP - needs some clean up and abstraction of functions that are being reused
    const dispatch = useDispatch()
    const activeFileCode = useSelector(getActiveFileCode)
    const extension = useSelector((state) => state.editor.extension)
    const activeFile = useSelector((state) => state.files.activeFile)
    const [code, setCode] = useState(activeFileCode)
    const [initialFiles, setInitialFiles] = useState(null)
    const debouncedSave = useCallback(
        debounce((newCode) => {
            console.log('newCode', newCode)
            dispatch(updateAndPersistCode(newCode)).then((updatedBlock) => {
                if (updatedBlock.files[extension] !== initialFiles[extension]) {
                    dispatch(
                        blockUpdate({
                            id: activeFile,
                            changes: { ...updatedBlock, unsavedChanges: true },
                        })
                    )
                } else {
                    dispatch(
                        blockUpdate({
                            id: activeFile,
                            changes: { ...updatedBlock, unsavedChanges: false },
                        })
                    )
                }
            })
        }, 200),
        [initialFiles, extension, activeFile]
    )

    useEffect(() => {
        async function getBlockCode() {
            fetchAndSetResetCode(activeFile).then((res) => {
                if (res) {
                    return setInitialFiles(res.files)
                }
            })
        }

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
        <StyledEditor>
            <div>
                <StyledButton
                    active={extension === 'html'}
                    onClick={() => setActiveExtension('html')}
                >
                    html
                </StyledButton>
                <StyledButton
                    active={extension === 'css'}
                    onClick={() => setActiveExtension('css')}
                >
                    css
                </StyledButton>
                <StyledButton
                    active={extension === 'js'}
                    onClick={() => setActiveExtension('js')}
                >
                    js
                </StyledButton>
            </div>
            <textarea
                style={{ width: '100%', height: '30em' }}
                onChange={(e) => onChange(e)}
                value={code}
                // language={language}
            />
        </StyledEditor>
    )
}
export default Editor

const StyledEditor = styled.div``
const StyledButton = styled.button`
    background: ${(props) => (props.active ? 'gray' : 'white')};
`
