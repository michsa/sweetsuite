import React from 'react'  
import Image from 'react-image-file'  
  
import { connect } from 'react-redux'  
import { Field, reduxForm } from 'redux-form'  
  
import { logIn, closeModal } from '../actions'  
  
/* ----------- * 
 *  COMPONENT  * 
 * ----------- */  
   
const LogInComponent = ({handleSubmit, submit, error}) => {  
  return (  
      <div id="login" className="log-in">  
        <div className="title">Sign In</div>        
        <div className="content">  
          { error ? <div className="error">{ error }</div> : '' }
          <form onSubmit={handleSubmit(submit)}>  
            <div className="email">    
              <Field component='input' type='text' name="email" placeholder="Email Address"/>  
            </div>  
            <div className="password">
              <Field component='input' type='password' name="pw" placeholder="Password"/>  
            </div>
            <button type='submit' className='btn'>Sign In</button>
          </form> 
        </div>
      </div>  
  )  
}  
  
  
/* ----------- * 
 *  CONTAINER  * 
 * ----------- */  
  
  
const mapStateToProps = (state, ownProps) => {  
  return {
    error: state.app.error
  }  
}  
  
const mapDispatchToProps = (dispatch, ownProps) => {  
  return {  
    submit: function (values) {
      dispatch(logIn(values))  
    }  
  }  
}  
  
const LogInContainer = connect(  
  mapStateToProps,  
  mapDispatchToProps  
)(LogInComponent)  
  
const LogInForm = reduxForm({  
  form: 'login'  
})(LogInContainer)  
  
export default LogInForm
