import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import authReducer from './State/index.js'
import { configureStore } from '@reduxjs/toolkit'
import { ToastContainer } from 'react-toastify'
import { Provider } from 'react-redux'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'

// store.js setup 
const persistConfig = {
  key: "root",
  storage: storage,
  version: 1
}
// redux-persist is used to store reducers and other client side state variable things of redux-toolkit
// whereas, react query manages the url fetching, stores the previously fetched pages to avoid redundant re-fetches  
const persistedReducer = persistReducer(persistConfig,authReducer);
const store = configureStore({//previously we have setup the store but without redux-persist, we just setup the reducers
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  })
})


createRoot(document.getElementById('root')).render(
  <>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <App />
        <ToastContainer position='bottom-left'/>
      </PersistGate>
    </Provider>
  </>,
)
