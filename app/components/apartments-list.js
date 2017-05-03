import React from 'react'
import Image from 'react-image-file'

import { connect } from 'react-redux'
import {removeFavorite} from '../actions'


/* ----------- *
 *  COMPONENT  *
 * ----------- */

const ApartmentsListComponent = ({apartments}) => {
  return (
      <div id="apartments" className="apartments-list">
        <p>Apartments list:</p>
        <ul>
          {apartments.map ((apartment, index, apartments) =>
            <li className="apartments-item" key={index} >
              <ListItem apt={apartment} />
            </li>
          )}
        </ul> 
      </div>
  )
}

const ListItem = ({apt}) => {
  return (
      <div className="list-item">
        <div className="address">
          <div className="line1">{apt.address}</div>
          <div className="line2">{apt.city}, {apt.state} {apt.zip}</div>
        </div>
        
        <div className="rooms">
          <div className="rent">${apt.rent}</div>
          <div className="beds">{apt.beds} Beds</div>
          <div className="baths">{apt.baths} Baths</div>
          <div className="floor">Floor: {apt.floor}</div>
        </div>
        
        { apt.img ? 
            <div className="images">
              <Image alt='some text'/>
            </div> 
            : <div>No images</div> 
        }
        
      </div>
  )
}

/* ----------- *
 *  CONTAINER  *
 * ----------- */

const mapStateToProps = (state, ownProps) => {
  
  let apts = state.app.apartments
  for (let i = 0; i < apts.length; i++) {
    if (apts[i].img) {
      console.log("apt img")
      console.log(apts[i].img.data)
      
      var binaryData = []
      binaryData.push(apts[i].img.data)
      var blob = new Blob(apts[i].img.data.data, {type: "image/png"})
      
      console.log("blob:")
      console.log(blob)
    }
  }
  
  return {
    apartments: state.app.apartments
  }
} 

const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
}

const ApartmentsListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ApartmentsListComponent)

export default ApartmentsListContainer
