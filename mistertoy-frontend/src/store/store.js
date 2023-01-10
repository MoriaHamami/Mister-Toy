import { combineReducers, compose, legacy_createStore as createStore } from 'redux'
import { appReducer } from './app.reducer.js'
// import { userReducer } from './user.reducer.js'
import { toyReducer } from './toy.reducer.js'

// const { createStore, combineReducers } = Redux
const middleware = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||compose
// const middleware = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : () => {} 

const rootReducer = combineReducers({
    appModule: appReducer,
    toyModule: toyReducer,
    // userModule: userReducer
})

// export const store = createStore(rootReducer, middleware)
export const store = createStore(rootReducer, middleware())

// For debug 
store.subscribe(() => {
    // console.log('**** Store state changed: ****')
    // console.log('storeState:\n', store.getState())
    // console.log('*******************************')
})

// setInterval(() => {
//     store.dispatch({ type: 'INCREMENT' })
// }, 1000)
// store.dispatch({type: 'INCREMENT'})
// store.dispatch({type: 'INCREMENT'})
// store.dispatch({type: 'INCREMENT'})
