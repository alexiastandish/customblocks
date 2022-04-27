import { db } from '../../services/firebase/init-firebase'
import { ref, onValue, set } from 'firebase/database'
import { blockUpdate } from './blocksSlice'

export const fetchBlocks = () => {
    return new Promise((resolve) => {
        try {
            const blocksListRef = ref(db, 'blocks/')
            onValue(blocksListRef, (snapshot) => {
                const data = snapshot.val()
                resolve(data)
            })
        } catch (error) {
            console.error('error', error)
        }
    })
}

export const fetchBlock = (id) => {
    return new Promise((resolve) => {
        try {
            const blocksListRef = ref(db, 'blocks/')
            onValue(blocksListRef, (snapshot) => {
                const data = snapshot.val()
                const block = data[id]
                resolve(block)
            })
        } catch (error) {
            console.error('error', error)
        }
    })
}

export const setBlocks = (id, block) => async (dispatch, getState) => {
    const currentBlocks = await fetchBlocks()
    let updatedBlocks = { ...currentBlocks }
    const updatedBlock = {
        files: block.files,
        id: block.id,
        name: block.name,
        timestamp: Date.now(),
    }
    updatedBlocks[id] = updatedBlock
    await set(ref(db, 'blocks/'), updatedBlocks)
    return dispatch(
        blockUpdate({
            id,
            changes: {
                ...updatedBlock,
                unsavedChanges: false,
                unsavedBlock: false,
            },
        })
    )
}
