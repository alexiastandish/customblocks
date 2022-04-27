import { blocksSlice } from '../features/blocks/blocksSlice'
import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { filesSlice } from '../features/files/filesSlice'
import { editorSlice } from '../features/editor/editorSlice'

const persistConfig = {
    key: 'codeblocks',
    storage,
    whitelist: ['blocks', 'editor'],
}

const appReducer = combineReducers({
    blocks: blocksSlice.reducer,
    // files: filesSlice.reducer,
    editor: editorSlice.reducer,
})

export default persistReducer(persistConfig, appReducer)
