import React from 'react'

import ApartmentsListContainer from './apartments-list'

import {connect} from 'react-redux'
import {fetchListings} from '../actions'


/* ----------- *
 *  COMPONENT  *
 * ----------- */

const HomepageComponent = ({test, apartments, loadApts}) => {
  return (
      <div id="home" className="noheader">
        <div className="title"></div>
        <div className="banner"><img href="../app/img_slide1.png"/></div> 
        <div className="content">
          <span onClick={loadApts}>Test getting data from express</span>
          <ApartmentsListContainer/>
        </div>
      </div>
  )
}


/* ----------- *
 *  CONTAINER  *
 * ----------- */

const mapStateToProps = (state, ownProps) => {  
  return {
    test: state.test,
    apartments: state.apartments
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadApts: (event) => {
      dispatch(fetchListings("home"))
    }
  }
}

const HomepageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomepageComponent)

export default HomepageContainer
