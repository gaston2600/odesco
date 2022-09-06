// import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import appReducer from './reducers';


// export default createStore(appReducer, applyMiddleware(thunk));

import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist'

import todoReducer from './reducers';
import { applyMiddleware, createStore } from 'redux'
import storage from 'redux-persist/lib/storage' 

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whiteList :["User"]
}

const persistedReducer = persistReducer(persistConfig, appReducer)

export const store = createStore(persistedReducer , applyMiddleware(thunk))
export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch