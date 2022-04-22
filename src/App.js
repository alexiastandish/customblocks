import React, { Suspense } from 'react'
import { Header, Container } from 'semantic-ui-react'

import TabBarContainer from './components/tabs/TabBarContainer'

import './App.css'
import Blocks from './features/blocks/Blocks'
import Files from './features/files/Files'
import FileTabsBarContainer from './features/files/FileTabs/FileTabsBarContainer'

const App = () => {
    return (
        <Suspense fallback={'loading'}>
            <Container>
                <div className="App">
                    <div className="App-header">
                        {/* <Header as="h1">Project Mini-Mek</Header> */}

                        {/* <Files /> */}
                        <Blocks />
                    </div>
                </div>
            </Container>
        </Suspense>
    )
}

export default App
