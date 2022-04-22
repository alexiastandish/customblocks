// import { combineReducers } from '@reduxjs/toolkit'
import { blocksSlice } from '../features/blocks/blocksSlice'
import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { filesSlice } from '../features/files/filesSlice'
// import postsReducer from '../features/posts/postsSlice'
// // import authReducer from './features/auth/authSlice';
// // import userReducer from './features/auth/userSlice';
// // import diariesReducer from './features/diary/diariesSlice';
// // import entriesReducer from './features/entry/entriesSlice';
// // import editorReducer from './features/entry/editorSlice';

const persistConfig = {
    key: 'codeblocks',
    storage,
    whitelist: ['blocks', 'files'],
}

const appReducer = combineReducers({
    files: filesSlice.reducer,
    blocks: blocksSlice.reducer,
})

export default persistReducer(persistConfig, appReducer)
