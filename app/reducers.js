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
      action.values.rent = parseInt(action.values.rent)
      action.values.sqft = parseInt(action.values.sqft)
      action.values.imgct = state.images.length
      
      console.log(action.values.imgct)
      
      fetch('/create', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(action.values)
      })
      .then(res => { return res.json() })
      .then(body => { 
        for (let i = 0; i < state.images.length; i++) {
          fetch('/create/' + body.id + '/' + i, {
            method: "POST",
            body: state.images[i]
          })
          .then(res => { return res.json() })
          .then(body => { console.log(body) })
        }
      })

      return state
      
    case 'REQUEST_LISTINGS':
      return generateState({
        isFetching: true,
        didInvalidate: false
      })
      
    case 'RECEIVE_LISTINGS':
      var context = require.context('url-loader!./img/', true, /\d[\.(png|jpg)]*$/)

      action.listings.forEach(apt => {
        if (apt.imgct) {
          apt.images = {}
          var i = 0
          context.keys().forEach((filename) => {
            if (filename.includes(apt._id)) {
              apt.images[filename] = context(filename)
              i++
            }
            if (i == apt.imgct) return 
          })
        }
      })

      return generateState({
        currentPage: action.page,
        isFetching: false,
        didInvalidate: false,
        apartments: action.listings,
        lastUpdated: action.receivedAt
      })
    
    case 'ADD_IMAGE':
      console.log(action.img)
      let newImages = state.images.slice(0)
      newImages.push(action.img)
      
      return generateState({
        images: newImages, 
        imageCount: state.imageCount + 1
      })
    
    case 'LOG_IN':

      return generateState({
        isFetching: false,
        isLoggedIn: true,
        user: {
          name: action.values.name,
          id: action.values.id
        }
      })
      
    case 'LOG_OUT':

      return generateState({
        isFetching: false,
        isLoggedIn: false,
        user: {
          name: null,
          id: null
        }
      })
      
      
    case 'CREATE_ACCOUNT':  
      if (action.values.pw == action.values.pw2) {  
        console.log(action.values)  
            
        fetch('/register', {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "POST",
          body: JSON.stringify(action.values)
        })
        .then(res => { return res.json() })  
        .then(body => { console.log(body) })  
      }
      return state 
      
    case 'SET_MODAL':
      return generateState({
        modal: action.modal
      })
    
    default:
      return state
  }
}

export default reducers
