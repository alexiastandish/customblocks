import { configureStore } from '@reduxjs/toolkit'
import persistReducer from './rootReducer'
import {
    FLUSH,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    REHYDRATE,
    persistStore,
} from 'redux-persist'

const store = configureStore({
    reducer: persistReducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                    REHYDRATE,
                ],
            },
        })
    },
})

export const persistor = persistStore(store)

export default store
