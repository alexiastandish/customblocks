import { db } from '../../services/firebase/init-firebase'
import { ref, onValue } from 'firebase/database'

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
