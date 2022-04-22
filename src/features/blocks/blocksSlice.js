import {
    createSlice,
    createEntityAdapter,
    createAsyncThunk,
    createAction,
} from '@reduxjs/toolkit'
import { fetchBlocks } from './blocksApi'

const blocksAdapter = createEntityAdapter({
    selectIds: (block) => block.id,
})

export const getBlocks = createAsyncThunk(
    'blocks/fetchBlocks',
    async (thunkAPI) => {
        const res = await fetchBlocks().then((data) => {
            return data
        })
        return res
    }
)

// export const resetBlocks = createAction('blocks/reset')

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
    // (builder) => {
    //     builder.addCase(resetBlocks, () => {
    //         return blocksAdapter.getInitialState()
    //     })
    // },
})

export const { blocksAddOne, blocksSetAll, blockUpdate } = blocksSlice.actions

export const getBlocksLength = (state) => state.blocks
