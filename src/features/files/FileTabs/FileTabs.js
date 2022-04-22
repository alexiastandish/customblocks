import React, { useState } from 'react'
import FileTabLabel from './FileTabLabel'
import { useDispatch, useSelector } from 'react-redux'
import './FileTabs.css'
import { addNewBlock } from 'thunks/add-new-block'
import { blocksSelector } from '../../blocks/blocksSelectors'
import { Button, Modal } from 'semantic-ui-react'
import { removeBlockFile } from 'thunks/remove-file'
import { setActiveFile } from '../filesSlice'

function FileTabs({ children }) {
    const [validating, setValidating] = useState({
        open: false,
        blockId: null,
    })
    const dispatch = useDispatch()
    const files = useSelector((state) => state.files.files)
    const activeFile = useSelector((state) => state.files.activeFile)
    const findFile = files.findIndex((el) => el.id === activeFile)
    const allBlocks = useSelector((state) => blocksSelector.selectAll(state))
    const getBlocks = useSelector((state) => state.blocks.entities)

    const setBlockValidation = (id) => {
        setValidating({ id, open: true })
    }
    return (
        <div>
            <ul className="tabrow">
                {children.map((item, index) => {
                    const itemId = files[index].id
                    const blockUnsaved = getBlocks[itemId].unsavedBlock

                    return (
                        <FileTabLabel
                            key={index}
                            title={item.props.title}
                            index={index}
                            files={files}
                            selectedTab={findFile}
                            unsaved={blockUnsaved}
                            setBlockValidation={setBlockValidation}
                        />
                    )
                })}
                <button onClick={() => dispatch(addNewBlock(allBlocks.length))}>
                    +
                </button>
            </ul>
            {children[findFile]}
            <Modal
                open={validating.open}
                // trigger={<Button>Show Modal</Button>}
                header="Reminder!"
                content="Call Benjamin regarding the reports."
                actions={[
                    {
                        key: 'dontSave',
                        content: `Don't Save`,
                        positive: false,
                        onClick: () => {
                            const removedFileIndex = files.findIndex(
                                (file) => file.id === validating.id
                            )

                            // const activeFileIndex = activeFile
                            const activeFileIndex = files.findIndex(
                                (file) => file.id === activeFile
                            )

                            console.log('removedFileIndex', removedFileIndex)
                            console.log('activeFileIndex', activeFileIndex)

                            if (activeFileIndex === removedFileIndex) {
                                if (removedFileIndex === 0) {
                                    dispatch(setActiveFile(files[1].id))
                                }
                                dispatch(
                                    setActiveFile(
                                        files[removedFileIndex - 1].id
                                    )
                                )
                            }
                            dispatch(
                                removeBlockFile(validating.id, setValidating)
                            )
                            // dispatch(
                            //     removeBlockFile(validating.id, setValidating)
                            // ).then((res) => {
                            //     const removedFile = files.findIndex((file) => {
                            //         return file.id === activeFile
                            //     })

                            //     const fileToClose = files.filter(
                            //         (file) => file.id === activeFile
                            //     )[0]

                            //     if (
                            //         files.length >= 2 &&
                            //         files[removedFile].id === activeFile
                            //     ) {
                            //         const newActiveFile = getNewActiveFileId(
                            //             files,
                            //             files.length,
                            //             fileToClose
                            //         )
                            //         dispatch(setActiveFile(newActiveFile.id))
                            //     }
                            // })
                        },
                    },
                    { key: 'save', content: 'Save', positive: true },
                ]}
            />
        </div>
    )
}
export default FileTabs

const getNewActiveFileId = (activeFiles, activeFilesLength, fileToClose) => {
    const fileToBeRemovedIndex = activeFiles.indexOf(fileToClose)

    if (fileToBeRemovedIndex + 1 === activeFilesLength) {
        return activeFiles[fileToBeRemovedIndex - 1]
    }

    return activeFiles[fileToBeRemovedIndex + 1]
}
