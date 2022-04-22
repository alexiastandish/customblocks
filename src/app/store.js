import { configureStore } from '@reduxjs/toolkit'
import persistReducer from './rootReducer'
import { persistStore } from 'redux-persist'

const store = configureStore({
    reducer: persistReducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck: false,
        })
    },
})

export const persistor = persistStore(store)

export default store
