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
    }),
    reducers: {
        blocksAddOne: blocksAdapter.addOne,
        blockUpdate: blocksAdapter.updateOne,
        blockRemove: blocksAdapter.removeOne,
        blocksSetAll: blocksAdapter.setAll,
    },
    extraReducers: {
        [getBlocks.pending]: (state) => {
            state.loading = true
        },
        [getBlocks.fulfilled]: (state, { payload }) => {
            state.loading = false
            blocksAdapter.upsertMany(state, payload)
        },
        [getBlocks.rejected]: (state) => {
            state.loading = false
        },
    },
})

export const { blocksAddOne, blocksSetAll, blockUpdate, blockRemove } =
    blocksSlice.actions

export const getBlocksLength = (state) => state.blocks
