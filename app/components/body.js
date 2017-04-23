import React from 'react'
import {Router, Route, Switch} from 'react-router'

import HomePageContainer from './homepage'
import CreateListingForm from './create-listing'

import createBrowserHistory from 'history/createBrowserHistory'
const history = createBrowserHistory()

import {connect} from 'react-redux'
        
/* ----------- *
 *  COMPONENT  *
 * ----------- */

const BodyComponent = ({page}) => { 
  return (
    <div id="body">
      <Router history={history}>
        <Switch>
          <Route path='/create' component={CreateListingForm} />
          <Route path='/' component={HomePageContainer} />
        </Switch>
      </Router>                                               
    </div>
  )
}

/* ----------- *
 *  CONTAINER  *
 * ----------- */

const mapStateToProps = (state, ownProps) => {  
  return {
    page: state.page
  }
}

const BodyContainer = connect(
  mapStateToProps
)(BodyComponent)

export default BodyContainer
