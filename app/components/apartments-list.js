import React from 'react'

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
      <div className="list-item">{apt}</div>
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
