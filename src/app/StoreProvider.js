import { Provider } from 'react-redux'
import store, { persistor } from './store'
import { PersistGate } from 'redux-persist/integration/react'

function StoreProvider(props) {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor} loading={null}>
                {props.children}
            </PersistGate>
        </Provider>
    )
}
export default StoreProvider
