import React from 'react'

import {connect} from 'react-redux'
import {logOut, openMenu, closeMenu, openModal } from '../actions'
import {Link} from 'react-router'


/* ----------- *
 *  COMPONENT  *
 * ----------- */

const MenuComponent = ({open, isLoggedIn, logOut, close, openModal }) => { 
  
  var show = function (shouldShow) {
    return ( shouldShow ? {display: "block"} : {display: "none"} )
  }
  
  return (
    <div id="menu" className="menu">
      { open ? <div className="menu-mask" onClick={close}>
        <div className="menu-wrapper">
          <div className="menu-container" onClick={(e) => e.stopPropagation()}>
            <ul>
              <li className="home"><a href="/">Home</a></li>
              <li className="search"><a href="/search">Search Apartments</a></li>
              <li className="favorites" style={show(isLoggedIn)} ><a href="/favorites">Your Favorites</a></li>
              <li className="create" style={show(isLoggedIn)} ><a href="/create">Add New Listing</a></li>
              <li className="listings" style={show(isLoggedIn)} ><a href="/listings">Your Listings</a></li>
              <li className="profile" style={show(isLoggedIn)} ><a href="/profile">View Profile</a></li>
              <li className="logout" style={show(isLoggedIn)} ><a onClick={logOut}>Log Out</a></li>
              <li className="login" style={show(!isLoggedIn)} ><a onClick={() => openModal('login')}>Sign In</a></li>
            </ul>
          </div>
        </div>
      </div> : "" }
    </div>
  )
}

/* ----------- *
 *  CONTAINER  *
 * ----------- */

const mapStateToProps = (state, ownProps) => {  
  return {
    isLoggedIn: state.app.isLoggedIn,
    open: state.app.menuOpen
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    logOut: function (event) {
      event.preventDefault()
      dispatch(logOut())
    },
    close: function() {
      dispatch(closeMenu())
    },
    openModal: function (modal) {
      dispatch(openModal(modal))
    }
  }
}

const MenuContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuComponent)

export default MenuContainer
