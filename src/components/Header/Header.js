import React from 'react'
import styled from 'styled-components'
import { setBlocks } from '../../features/blocks/blocksApi'
import { useSelector, useDispatch } from 'react-redux'
import { getBlockEntities } from '../../features/blocks/blocksSelectors'
import { DateTime } from 'luxon'

function Header(props) {
    const dispatch = useDispatch()
    const activeFile = useSelector((state) => state.files.activeFile)
    const blocks = useSelector(getBlockEntities)
    // const test = DateTime.fromObject(blocks[activeFile].timestamp)
    // console.log('test', test)
    const lastUpdated =
        blocks[activeFile]?.timestamp &&
        DateTime.fromISO(blocks[activeFile]?.timestamp).toFormat(
            'MMMM dd, yyyy HH:mm:ss'
        )
    return (
        <StyledHeader>
            <h1>Custom Blocks</h1>
            <div className="save-controls">
                {lastUpdated && <p>Last update: {lastUpdated} </p>}
                <button
                    onClick={() => {
                        const updatedBlock = blocks[activeFile]
                        const cleanedUpBlock = {
                            files: updatedBlock.files,
                            id: activeFile,
                            name: updatedBlock.name,
                            timestamp: DateTime.now().toISO(),
                            unsavedChanges: false,
                            unsavedBlock: false,
                        }

                        return dispatch(setBlocks(activeFile, cleanedUpBlock))
                    }}
                >
                    Save
                </button>
            </div>
        </StyledHeader>
    )
}
export default Header

const StyledHeader = styled.div`
    padding: 0.5em;
    display: flex;
    justify-content: space-between;
    align-items: center;

    h1 {
        margin: 0;
    }

    .save-controls {
        display: flex;
        align-items: center;

        p {
            margin: 0;
            margin-right: 3em;
        }
    }
`
