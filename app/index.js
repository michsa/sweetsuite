import React from 'react'
import { render } from 'react-dom'

import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'
import reducers from './reducers'
import { fetchListings } from './actions'
import AppContainer from './components/app'
require('./style.sass')

localStorage.clear()
localStorage.setItem('settings', JSON.stringify({
    textSpeed: 40,
    textWidth: 48,
    textLines: 4,
    actionsPerPage: 3
  }))


/* keep in localstate:
   - user identifying info ("keep me logged in")
*/

var defaultState = {
  app: {
    isLoggedIn: false,
    user: {
      name: null,
      id: null
    },
    currentPage: null,
    isFetching: false,
    didInvalidate: false,
    lastUpdated: null,
    apartments: [],
    images: [],
    error: null
  },
  form: {}
}

console.log(defaultState)
console.log(localStorage)

console.log("myReducers")
console.log(reducers)

const combinedReducers = combineReducers({
  app: reducers,
  form: formReducer     // <---- Mounted at 'form'
})

const store = createStore(
  combinedReducers,
  defaultState,
  applyMiddleware(thunkMiddleware)
)

store.dispatch(fetchListings('home'))

render (
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById("content")
)
