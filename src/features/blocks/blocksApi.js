import { db } from '../../services/firebase/init-firebase'
import { ref, onValue, set } from 'firebase/database'
import { blocksSetAll, blockUpdate } from './blocksSlice'

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
    console.log('block', block)
    const currentBlocks = await fetchBlocks()
    let updatedBlocks = { ...currentBlocks }
    const updatedBlock = {
        files: block.files,
        id: block.id,
        index: block.index,
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
