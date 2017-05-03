import fetch from 'isomorphic-fetch'

export const createListing = (object) => {
  return {
    type: 'CREATE_LISTING',
    values: object
  }
}

export const requestListings = (page) => {
  return {
    type: 'REQUEST_LISTINGS',
    page
  }
}

export const receiveListings = (page, json) => {
  return {
    type: 'RECEIVE_LISTINGS',
    page,
    listings: json,
    receivedAt: Date.now()
  }
}

export const fetchListings = (page) => {

  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.

  return function (dispatch) {

    // First dispatch: the app state is updated to inform
    // that the API call is starting.

    dispatch(requestListings(page))

    // The function called by the thunk middleware can return a value,
    // that is passed on as the return value of the dispatch method.

    // In this case, we return a promise to wait for.
    // This is not required by thunk middleware, but it is convenient for us.

    return fetch('/apartments', {
      method: 'GET'
    })
    .then(res => { 
      console.log("res")
      console.log(res)
      return res.json()
    })
    .then(json => { 
      console.log("json")
      console.log(json)
      
      // We can dispatch many times!
      // Here, we update the app state with the results of the API call.

      dispatch(receiveListings(page, json))
    })
  }
}

export const addImage = (file) => {
  return {
    type: 'ADD_IMAGE',
    img: file
  }
}

export const logIn = (values) => {
  return function (dispatch) {

    return fetch('/login', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(values)
    })
    .then(res => { return res.json() })  
    .then(json => { 
      if (json.success) {
        dispatch(closeModal())
        dispatch(logInSuccess(json))
      }
      else dispatch(logInFailure(json))
    })
  }
}

export const logInSuccess = (object) => {
  return {
    type: 'LOG_IN_SUCCESS',
    values: object
  }
}

export const logInFailure = (object) => {
  return {
    type: 'LOG_IN_FAILURE',
    values: object
  }
}

export const logOut = (object) => {
  return {
    type: 'LOG_OUT',
    values: object
  }
}

export const openModal = (object) => {
  return {
    type: 'SET_MODAL',
    modal: object
  }
}

export const closeModal = () => {
  return {
    type: 'SET_MODAL',
    modal: null
  }
}

export const createAccount = (values) => {
  return function (dispatch) {

    if (values.pw != values.pw2) {  
      dispatch(fulfillRegister({success: false, message: "Error: passwords did not match."}))
      return
    }
    else {
      console.log(values)  

      return fetch('/register', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(values)
      })
      .then(res => { return res.json() })  
      .then(json => { 
        if (json.success) {
          dispatch(closeModal())
          dispatch(registerSuccess(json))
        }
        else dispatch(registerFailure(json))
      })
    }
  }
}

export const registerSuccess = (object) => {
  return {
    type: 'REGISTER_SUCCESS',
    values: object
  }
}

export const registerFailure = (object) => {
  return {
    type: 'REGISTER_FAILURE',
    values: object
  }
}
