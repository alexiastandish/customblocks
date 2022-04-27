import { javascript } from '@codemirror/lang-javascript'
import { defaultHighlightStyle } from '@codemirror/highlight'
import { bracketMatching } from '@codemirror/matchbrackets'
import { highlightStyle } from 'utils/highlightStyles'
import { EditorView, lineNumbers } from '@codemirror/view'
// import { lineNumbers } from '@codemirror/gutter'

export const extensions = [
    // highlightStyle,
    EditorView.lineWrapping,
    lineNumbers(),
    javascript({ jsx: true, typescript: true }),
    bracketMatching(),
    defaultHighlightStyle.fallback,
    EditorView.theme('material-palenight', { dark: true }),
]
