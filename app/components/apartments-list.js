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
          <ul>
            {apartments.map ((apartment, index, apartments) =>
                <ListItem apt={apartment} key={index} />
            )}
          </ul>
      </div>
  )
}

const ListItem = function ({apt}) {
  
  return (
      <li className="apartments-item" >
        <div className="green">
          <div className="rent">
            <div className="rent">${apt.rent}</div>
          </div>
          
          <div className="address">
            <div className="line1">{apt.address}</div>
            <div className="line2">{apt.city}, {apt.state} {apt.zip}</div>
          </div>
          
          
          <div className="rooms">
            <div className="beds">{apt.beds} Beds</div>
            <div className="baths">{apt.baths} Baths</div>
            <div className="sqft">{apt.sqft} sqft.</div>
          </div>
        </div>
        
        <div className="images">
          { Object.keys(apt.images).map(img =>
            <div className="img-holder"><img src={apt.images[img]} key={img} /></div>
          )}
        </div> 
      </li>
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
