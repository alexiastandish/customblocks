import React, { useRef, useEffect } from 'react'
import { basicSetup } from '@codemirror/basic-setup'
import { extensions } from './extensions'
import { EditorView } from '@codemirror/view'
import { EditorState } from '@codemirror/state'
import { getLanguage } from 'utils/getLanguage'
import { useSelector } from 'react-redux'
import { oneDarkTheme } from '@codemirror/theme-one-dark'

function CustomEditor({ setView, initialCode: doc, view }) {
    const extension = useSelector((state) => state.editor.extension)
    console.log('extension', getLanguage(extension))
    const editorRef = useRef(null)
    console.log('extensions', extensions)
    // console.log('doc', doc)
    useEffect(() => {
        if (editorRef.current === null) return

        // const state = EditorState.create({
        //     extensions: [basicSetup, getLanguage(extension)],
        //     // extensions: [getLanguage(extension), extensions],
        //     // doc,
        // })

        const view = new EditorView({
            state: EditorState.create({
                extensions: [basicSetup, getLanguage(extension), oneDarkTheme],
                doc,
            }),
            parent: editorRef.current,
        })

        setView(view)
        return () => {
            view.destroy()
            setView(null)
        }
    }, [doc, setView, editorRef.current])

    return <section ref={editorRef} className="editor" />
}
export default CustomEditor
