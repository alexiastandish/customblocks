import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchBlocks } from './blocksApi'
import blocksAdapter from './blocksAdapter'
import generateNewBlock from 'utils/generateNewBlock'

export const getBlocks = createAsyncThunk(
    'blocks/fetchBlocks',
    async (allBlocks) => {
        const res = await fetchBlocks().then((data) => {
            return data
        })
        if (allBlocks.length > 0) {
            allBlocks.map((block) => {
                if (res && res[block.id]) {
                    res[block.id] = { ...res[block.id], files: block.files }
                }
            })
        }
        return res
    }
)

export const blocksSlice = createSlice({
    name: 'blocks',
    initialState: blocksAdapter.getInitialState({
        loading: true,
        error: null,
        files: [],
        activeFile: null,
    }),
    reducers: {
        blocksAddOne: (state, action) => {
            console.log('action.payload', action.payload)
            state.files.push(action.payload.id)
            return blocksAdapter.addOne(state, action.payload)
        },
        blockUpdate: blocksAdapter.updateOne,
        blockRemove: blocksAdapter.removeOne,
        blocksSetAll: blocksAdapter.setAll,
        removeFile(state, action) {
            state.files.splice(action.payload, 1)
        },
    },
    extraReducers: {
        [getBlocks.pending]: (state) => {
            state.loading = true
        },
        [getBlocks.fulfilled]: (state, { payload }) => {
            state.loading = false

            if (!state.activeFile) {
                const blocksArray = Object.values(payload)
                const lastBlockNumber = Number(
                    blocksArray[blocksArray.length - 1].id.replace(
                        'merchant-name:',
                        ''
                    )
                )

                const initialBlock = generateNewBlock(lastBlockNumber)
                state.files.push(initialBlock.id)
                state.activeFile = initialBlock.id
                return blocksAdapter.upsertMany(state, {
                    ...payload,
                    [initialBlock.id]: initialBlock,
                })
            }
            blocksAdapter.upsertMany(state, payload)
        },
        [getBlocks.rejected]: (state) => {
            state.loading = false
        },
    },
})

export const {
    blocksAddOne,
    blocksSetAll,
    blockUpdate,
    blockRemove,
    removeFile,
} = blocksSlice.actions

export const getBlockEntities = (state) => {
    return state.blocks.entities
}
