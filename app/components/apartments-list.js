import React from 'react'
import Image from 'react-image-file'

import { connect } from 'react-redux'
import {removeFavorite} from '../actions'

const testimg = require("url-loader!../img/5909ca54a29b48798332ef12/0")

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

const ListItem = function ({apt}) {
  
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
        
        <div className="images">
          { Object.keys(apt.images).map(img =>
            <Image file={apt.images[img]} key={apt._id.toString() + img.toString()} />
          )}
        </div>
        
      </div>
  )
}

/* ----------- *
 *  CONTAINER  *
 * ----------- */

const mapStateToProps = (state, ownProps) => { 
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
