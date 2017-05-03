import fetch from 'isomorphic-fetch'

export const createListing = (object) => {
  return {
    type: 'CREATE_LISTING',
    values: object
  }
}

export const latestApartments = () => {
  return {
    type: 'LATEST_APARTMENTS'
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
      
      for (let i = 0; i < json.length; i++) {
        if (json[i].img) {
          return fetch('/apartments/img', {
            method: 'GET',
            body: json[i]._id
          })
          .then(res => { return res.blob() })
          .then(blob => { 
            console.log(blob)
            
            dispatch(receiveListingImages(page, blobs))
          })
        }
        
      }
      
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
