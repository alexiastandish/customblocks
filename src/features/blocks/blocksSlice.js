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
    async (allBlocks, thunkAPI) => {
        console.log('allBlocks', allBlocks)
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
            console.log('PAYLOAD', payload)
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
