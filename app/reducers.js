import fetch from 'isomorphic-fetch'
import * as actions from './actions'
// import * as db from './src/db'
// import {utilName} from './utils'

// initialize db here

const reducers = (state = {}, action) => {

  /* ~~~~~~~~~~~~~~ *
   *  UTIL METHODS  *
   * ~~~~~~~~~~~~~~ */

  // wrapper for Object.assign because pretty
  const generateState = (...args) => {
    return Object.assign({}, state, ...args)
  }
  
  // for when there are too many copies
  const mutateState = (state, object) => {
    for (var k in object) state[k] = object[k]
    return state
  }
    
  /* ~~~~~~~~~~~~~~~~ *
   *  REDUCER PROPER  *
   * ~~~~~~~~~~~~~~~~ */

  switch (action.type) {

    case 'CREATE_LISTING':
      action.values.owner_id = state.user.id
      console.log(action.values)
      
      fetch('/create', {
        method: 'POST',
        body: action.values
      })
      .then(res => { return res.json() })
      .then(body => { console.log(body) })

      return state
      
    case 'REQUEST_LISTINGS':
      return generateState({
        isFetching: true,
        didInvalidate: false
      })
      
    case 'RECEIVE_LISTINGS':
      return generateState({
        currentPage: action.page,
        isFetching: false,
        didInvalidate: false,
        apartments: action.listings,
        lastUpdated: action.receivedAt
      })
    
    default:
      return state
  }
}

export default reducers
