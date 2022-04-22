import React, { Suspense } from 'react'
import Header from 'components/Header/Header'
import './App.css'
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
            </div>
        </Suspense>
    )
}

export default App
