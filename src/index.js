import { StrictMode } from 'react'

import * as ReactDOMClient from 'react-dom/client'
import './index.css'
import App from './App'
import StoreProvider from './app/StoreProvider'
import 'semantic-ui-css/semantic.css'

const root = ReactDOMClient.createRoot(document.getElementById('root'))
root.render(
    // <StrictMode>
    <StoreProvider>
        <App />
    </StoreProvider>
    // </StrictMode>
)
