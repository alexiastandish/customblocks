import { Provider } from 'react-redux'
import store, { persistor } from './store'
import { PersistGate } from 'redux-persist/integration/react'

function StoreProvider(props) {
    console.log('persistor', persistor)
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor} loading={<div>loading</div>}>
                {props.children}
            </PersistGate>
        </Provider>
    )
}
export default StoreProvider
