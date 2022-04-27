import { javascript } from '@codemirror/lang-javascript'
import { html } from '@codemirror/lang-html'
import { css } from '@codemirror/lang-css'

export const getLanguage = (lang) => {
    switch (lang) {
        case 'html':
            return html()
        case 'css':
            return css()
        case 'js':
            return javascript()
        default:
            break
    }
}
