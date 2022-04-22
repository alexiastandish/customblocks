import React, { Suspense } from 'react'
import { Container } from 'semantic-ui-react'
import Header from 'components/Header/Header'
import './App.css'
import Blocks from './features/blocks/Blocks'
import Files from './features/files/Files'
import Sidebar from './components/Sidebar/Sidebar'
import Editor from './features/editor/Editor'

const App = () => {
    return (
        <Suspense fallback={'loading'}>
            <div className="App">
                <div className="main">
                    <Header />
                    <Files />
                    <Editor />
                </div>
                <Sidebar />
                {/* <Container>
                    <Blocks />
                </Container> */}
            </div>
        </Suspense>
    )
}

export default App
