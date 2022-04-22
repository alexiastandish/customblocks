import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const getPosts = createAsyncThunk(
    'posts/getPost',
    async (obj, { dispatch, getState }) => {
        return fetch('https://jsonplaceholder.typicode.com/posts').then((res) =>
            res.json()
        )
    }
)

const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        list: [],
        status: 'null',
    },
    extraReducers: {
        [getPosts.pending]: (state, action) => {
            state.status = 'loading'
        },
        [getPosts.fulfilled]: (state, action) => {
            state.list = action.payload
            state.status = 'success'
        },
        [getPosts.rejected]: (state, action) => {
            state.status = 'failed'
        },
    },
})

export default postsSlice.reducer
