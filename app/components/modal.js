import React from 'react'  
import { connect } from 'react-redux'
import { closeModal } from '../actions' 

import LogInForm from './log-in'
import CreateAccountForm from './create-account'
import SuccessForm from './success'
  
/* ----------- * 
 *  COMPONENT  * 
 * ----------- */  

const ModalComponent = ({modal, close}) => {  
  return (  
    <div id="modal">
      { modal ? <div className="modal-mask" onClick={close}>
        <div className="modal-wrapper">
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>

            { modal == 'login' ? <LogInForm/> :
              modal == 'register' ? <CreateAccountForm/> :
              modal == 'success' ? <SuccessForm/> : ""
            }
            
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
    modal: state.app.modal,
    error: state.app.error
  }  
}  
  
const mapDispatchToProps = (dispatch, ownProps) => {  
  return {  
    close: function() {
      dispatch(closeModal())  
    }  
  }  
}  
  
const ModalContainer = connect(  
  mapStateToProps,  
  mapDispatchToProps  
)(ModalComponent)  

export default ModalContainer
