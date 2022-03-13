import { rootReducer } from './reducers/rootReducer';
import thunk from 'redux-thunk';
import { compose, createStore, applyMiddleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { reduxBatch } from '@manaflair/redux-batch'

const composeEnhancers =
  typeof window === 'object' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

// const enhancer = composeEnhancers(applyMiddleware(thunk));
//export const store = createStore(rootReducer, enhancer);

const reducer = rootReducer
export const store = configureStore({
  reducer,
  devTools: composeEnhancers,
  enhancers: [reduxBatch]
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch