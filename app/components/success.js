import React from 'react'
import Image from 'react-image-file'

import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import { createListing, addImage } from '../actions'
import { logIn, closeModal } from '../actions'

/* ----------- *
 *  COMPONENT  *
 * ----------- */

const SuccessComponent = ({handleSubmit, submit}) => {
  return (
      <div id="create" className="create-listing">
        <div className="title">Listing Added</div>      
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
  return {  
    submit: function (values) {
      dispatch(closeModal())
    }  
  }  
}

const SuccessContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SuccessComponent)

const SuccessForm = reduxForm({
  form: 'success'  // a unique identifier for this form
})(SuccessContainer)

export default SuccessForm
