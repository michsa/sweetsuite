import React from 'react'

import HeaderContainer from './header'
import FooterComponent from './footer'
import BodyContainer from './body'

import {connect} from 'react-redux'
import {readKey} from '../actions'


/* ----------- *
 *  COMPONENT  *
 * ----------- */

const AppComponent = () => { 
  return (
    <div id="app" >
      <HeaderContainer/>
      <div id="scroll">
        <BodyContainer/>
        <FooterComponent/>
      </div>
    </div>
  )
}

/* ----------- *
 *  CONTAINER  *
 * ----------- */

const mapStateToProps = (state, ownProps) => {  
  return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
}

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppComponent)

export default AppContainer
