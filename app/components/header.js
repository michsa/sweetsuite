import React from 'react'

import logo from "../title_small.png"
import menu from "../menu.png"

import {connect} from 'react-redux'
import {logOut, openModal} from '../actions'


/* ----------- *
 *  COMPONENT  *
 * ----------- */

const HeaderComponent = ({isLoggedIn, name, accessModal, logOut }) => { 
  
  var style = {
    backgroundImage: 'url("' + logo + '")'
  }
  
  return (
    <div id="header" className="header">
      <div className="menu"><img src={menu} /> Menu</div>
      <div className="logo">
        <a href="/"><img src={logo} /></a>
      </div>
        { isLoggedIn ?
          <div className="welcome">
            <span>Welcome {name}</span> · <span onClick={logOut}>Log Out</span>
          </div>
          :
          <div className="welcome">
            <span onClick={() => accessModal('login')}>Sign In</span> / <span onClick={() => accessModal('register')}>Sign Up</span>
          </div>
        }
    </div>
  )
}

/* ----------- *
 *  CONTAINER  *
 * ----------- */

const mapStateToProps = (state, ownProps) => {  
  return {
    name: state.app.user.name,
    isLoggedIn: state.app.isLoggedIn
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    logOut: function (event) {
      event.preventDefault()
      dispatch(logOut())
    },
    accessModal: function (modal) {
      dispatch(openModal(modal))
    }
  }
}

const HeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderComponent)

export default HeaderContainer
