// import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
import appReducer from './reducers';


// export default createStore(appReducer, applyMiddleware(thunk));

import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist'

import todoReducer from './reducers';
import { createStore } from 'redux'
import storage from 'redux-persist/lib/storage' 

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, appReducer)

export const store = createStore(persistedReducer)
export const persistor = persistStore(store)