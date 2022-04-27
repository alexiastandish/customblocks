import React, { useState } from 'react'
import FileTabLabel from './FileTabLabel'
import { useDispatch, useSelector } from 'react-redux'
import './FileTabs.css'
import { addNewBlock } from 'thunks/add-new-block'
import { blocksSelector, getBlockEntities } from '../../blocks/blocksSelectors'
import { Modal } from 'semantic-ui-react'
import { handleRemoveFile } from '../../../utils/handleRemoveFile'
import { setBlocks } from '../../blocks/blocksApi'

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
    const getBlocks = useSelector(getBlockEntities)
    console.log('getBlocks', getBlocks)
    const setBlockValidation = (id) => {
        setValidating({ id, open: true })
    }
    return (
        <div>
            <ul className="tabrow">
                {children.map((item, index) => {
                    const itemId = files[index].id
                    const blockUnsaved = getBlocks[itemId].unsavedChanges

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
                            const activeFileIndex = files.findIndex(
                                (file) => file.id === activeFile
                            )
                            dispatch(
                                handleRemoveFile(
                                    removedFileIndex,
                                    activeFileIndex
                                )
                            )

                            return setValidating({ id: null, open: false })
                        },
                    },
                    {
                        key: 'save',
                        content: 'Save',
                        positive: true,
                        onClick: async () => {
                            const updatedBlock = getBlocks[activeFile]

                            const cleanedUpBlock = {
                                files: updatedBlock.files,
                                id: activeFile,
                                name: updatedBlock.name,
                                timestamp: Date.now(),
                                unsavedChanges: false,
                                unsavedBlock: false,
                            }

                            dispatch(
                                setBlocks(activeFile, cleanedUpBlock)
                            ).then((res) => {
                                console.log('res', res)
                                return setValidating({ id: null, open: false })
                            })
                        },
                    },
                ]}
            />
        </div>
    )
}
export default FileTabs
