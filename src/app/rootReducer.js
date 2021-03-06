import { blocksSlice } from '../features/blocks/blocksSlice'
import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { filesSlice } from '../features/files/filesSlice'
import { editorSlice } from '../features/editor/editorSlice'

const persistConfig = {
    key: 'codeblocks',
    storage,
    whitelist: ['blocks', 'files', 'editor'],
}

const appReducer = combineReducers({
    files: filesSlice.reducer,
    blocks: blocksSlice.reducer,
    editor: editorSlice.reducer,
})

export default persistReducer(persistConfig, appReducer)
