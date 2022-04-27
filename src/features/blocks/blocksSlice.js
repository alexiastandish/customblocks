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

export const blocksSlice = createSlice({
    name: 'blocks',
    initialState: blocksAdapter.getInitialState({
        loading: true,
        error: null,
    }),
    reducers: {
        blocksAddOne: (state, { payload }) => {
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

            return blocksAdapter.upsertMany(state, sortBlocks(payload))
        },
        [getBlocks.rejected]: (state) => {
            state.loading = false
        },
    },
})

export const { blocksAddOne, blocksSetAll, blockUpdate, blockRemove } =
    blocksSlice.actions

export const getBlocksLength = (state) => state.blocks

const sortBlocks = (blocks) => {
    if (Object.values(blocks).length > 1) {
        return Object.entries(blocks)
            .sort(([, a], [, b]) => {
                const aNumber = Number(a.id.replace('merchant-name:', ''))
                const bNumber = Number(b.id.replace('merchant-name:', ''))

                return aNumber - bNumber
            })
            .reduce((r, [k, v]) => ({ ...r, [k]: v }), {})
    }

    return blocks
}
