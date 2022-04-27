import React from 'react'
import styled from 'styled-components'
import { setBlocks } from '../../features/blocks/blocksApi'
import { useSelector, useDispatch } from 'react-redux'

function Header(props) {
    const dispatch = useDispatch()
    const activeFile = useSelector((state) => state.files.activeFile)
    const blocks = useSelector((state) => state.blocks.entities)
    return (
        <StyledHeader>
            <h1>Custom Blocks</h1>
            <div className="save-controls">
                <p>Last update: </p>
                <button
                    onClick={() => {
                        const updatedBlock = blocks[activeFile]
                        const cleanedUpBlock = {
                            files: updatedBlock.files,
                            id: activeFile,
                            name: updatedBlock.name,
                            timestamp: Date.now(),
                            index: Object.values(blocks).length,
                            unsavedChanges: false,
                            unsavedBlock: false,
                        }
                        // dispatch(
                        //     blockUpdate({
                        //         id: activeFile,
                        //         changes: {
                        //             ...cleanedUpBlock,
                        //         },
                        //     })
                        // )
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
