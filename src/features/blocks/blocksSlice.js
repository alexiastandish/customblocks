import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchBlocks } from './blocksApi'
import blocksAdapter from './blocksAdapter'

export const getBlocks = createAsyncThunk(
    'blocks/fetchBlocks',
    async (allBlocks) => {
        const res = await fetchBlocks().then((data) => {
            return data
        })
        if (allBlocks.length > 0) {
            allBlocks.map((block) => {
                if (res && res[block.id]) {
                    res[block.id] = {
                        ...res[block.id],
                        files: block.files,
                        unsavedBlock: false,
                        unsavedChanges: false,
                    }
                }
            })
        }
        return res
    }
)

// export const setBlocks = createAsyncThunk(
//     'blocks/fetchBlocks',
//     async (newBlock, thunkAPI) => {
//         console.log('newBlock', newBlock)
//         const { blocks } = thunkAPI.getState()
//         console.log('blocks', blocks)
//         const currentBlocks = await fetchBlocks()

//         let updatedBlocks = { ...currentBlocks }
//         // updatedBlocks[id] = { ...block, timestamp: Date.now() }
//         // await set(ref(db, 'blocks/'), updatedBlocks)

//         const res = await fetchBlocks().then((data) => {
//             console.log('data', data)
//             return {
//                 ...data,
//                 [newBlock.id]: {
//                     files: newBlock.files,
//                     id: newBlock.id,
//                     index: Object.values(data).length,
//                     name: newBlock.name,
//                     timestamp: Date.now(),
//                 },
//             }
//         })
//         console.log('res', res)
//         if (allBlocks.length > 0) {
//             allBlocks.map((block) => {
//                 if (res && res[block.id]) {
//                     res[block.id] = {
//                         ...res[block.id],
//                         files: block.files,
//                         unsavedBlock: false,
//                         unsavedChanges: false,
//                     }
//                 }
//             })
//         }
//         return res
//     }
// )

export const blocksSlice = createSlice({
    name: 'blocks',
    initialState: blocksAdapter.getInitialState({
        loading: true,
        error: null,
    }),
    reducers: {
        blocksAddOne: (state, { payload }) => {
            console.log('ADD', payload)
            const updatedBlock = {
                ...payload,
            }
            return blocksAdapter.addOne(state, updatedBlock)
        },
        blockUpdate: (state, { payload }) => {
            state.entities = {
                ...state.entities,
                [payload.id]: {
                    ...payload.changes,
                    unsavedChanges: payload.changes.unsavedChanges,
                    unsavedBlock: payload.changes.unsavedBlock,
                },
            }
        },
        blockRemove: blocksAdapter.removeOne,
        blocksSetAll: blocksAdapter.setAll,
    },
    extraReducers: {
        [getBlocks.pending]: (state) => {
            state.loading = true
        },
        [getBlocks.fulfilled]: (state, { payload }) => {
            state.loading = false

            return blocksAdapter.upsertMany(state, payload)
        },
        // [getBlocks.fulfilled]: (state, { payload }) => {
        //     state.loading = false

        //     // return blocksAdapter.upsertMany(state, sortBlocks(payload))
        // },
        [getBlocks.rejected]: (state) => {
            state.loading = false
        },
    },
})

export const { blocksAddOne, blocksSetAll, blockUpdate, blockRemove } =
    blocksSlice.actions

export const getBlocksLength = (state) => state.blocks

const sortBlocks = (blocks) => {
    console.log('blocks', blocks)
    if (Object.values(blocks).length > 1) {
        // const sortedArray = Object.values(blocks).sort((a, b) => {
        //     return a.timestamp - b.timestamp
        // })
        // console.log('sortedArray', sortedArray)

        return Object.entries(blocks)
            .sort(([, a], [, b]) => a.index - b.index)
            .reduce((r, [k, v]) => ({ ...r, [k]: v }), {})
    }

    return blocks
}
