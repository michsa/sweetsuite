import React from 'react'  
import Image from 'react-image-file'  
  
import { connect } from 'react-redux'  
import { Field, reduxForm } from 'redux-form'  
  
import { createAccount, closeModal } from '../actions'  
  
/* ----------- * 
 *  COMPONENT  * 
 * ----------- */  
   
const CreateAccountComponent = ({handleSubmit, submit}) => {  
  return (  
      <div id="register" className="create-account">  
        <div className="title">Sign Up</div>        
        <div className="content">  
          <form onSubmit={handleSubmit(submit)}>  
            <div className="first">
              <Field component='input' type='text' name="first" placeholder="First Name"/>  
            </div>  
            <div className="last"> 
              <Field component='input' type='text' name="last" placeholder="Last Name"/>  
            </div>  
            <div className="email"> 
              <Field component='input' type='text' name="email" placeholder="Email Address"/>  
            </div>  
            <div className="password">  
              <Field component='input' type='password' name="pw" placeholder="Password"/>  
            </div>  
            <div className="password2">
              <Field component='input' type='password' name="pw2" placeholder="Confirm Password"/>  
            </div>
            <button type='submit' className='btn'>Sign Up</button>
          </form>
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
  return {  
    submit: function (values) {
      dispatch(closeModal())
      dispatch(createAccount(values))  
    }  
  }  
}  
  
const CreateAccountContainer = connect(  
  mapStateToProps,  
  mapDispatchToProps  
)(CreateAccountComponent)  
  
const CreateAccountForm = reduxForm({  
  form: 'create'  // a unique identifier for this form  
})(CreateAccountContainer)  
  
export default CreateAccountForm
