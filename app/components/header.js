import React from 'react'

import logo from "../title_small.png"
import menu from "../menu.png"

import {connect} from 'react-redux'
import {logOut} from '../actions'


/* ----------- *
 *  COMPONENT  *
 * ----------- */

const HeaderComponent = ({name, logOut }) => { 
  
  var style = {
    backgroundImage: 'url("' + logo + '")'
  }
  
  return (
    <div id="header" className="header">
      <div className="menu"><img src={menu} /> Menu</div>
      <div className="logo">
        <img src={logo} />
      </div>
      <div className="welcome">
        <span>Welcome {name}</span> · <span onClick={logOut}>Log Out</span>
      </div>
    </div>
  )
}

/* ----------- *
 *  CONTAINER  *
 * ----------- */

const mapStateToProps = (state, ownProps) => {  
  return {
    name: state.name
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    logOut: (event) => {
      //event.preventDefault()
      dispatch(logOut())
    }
  }
}

const HeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderComponent)

export default HeaderContainer
