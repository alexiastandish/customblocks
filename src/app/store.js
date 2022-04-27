import { configureStore } from '@reduxjs/toolkit'
import persistReducer from './rootReducer'
import { persistStore } from 'redux-persist'
import logger from 'redux-logger'

const store = configureStore({
    devTools: { name: 'customblocks' },
    reducer: persistReducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck: false,
        })
        // .concat(logger)
    },
})

export const persistor = persistStore(store)

export default store
