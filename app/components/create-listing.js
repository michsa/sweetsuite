import React from 'react'
import Image from 'react-image-file'

import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import { createListing, addImage } from '../actions'
import {logOut, openModal} from '../actions'

/* ----------- *
 *  COMPONENT  *
 * ----------- */
 
const CreateListingComponent = ({handleSubmit, submit, uploadImage, images, accessModal}) => {
  return (
      <div id="create" className="create-listing">
        <div className="title">Add New Apartment Listing</div>      
        <div className="content">
          <form onSubmit={handleSubmit(submit)}>
            <div className="address">
              <label>Address:</label>
              <Field component='input' type='text' name="address" placeholder="123 Sesame Street"/>
            </div>
            <div className="city">
              <label>City:</label>
              <Field component='input' type='text' name="city" placeholder="Sunnyville"/>
            </div>
            <div className="state">
              <label>State:</label>
              <Field component='input' type='text' name="state" placeholder="WY"/>
            </div>
            <div className="zip">
              <label>Zip:</label>
              <Field component='input' type='text' name="zip" placeholder="78827"/>
            </div>
            <div className="rent">  
              <label>Rent:</label>
              <span className="dollar">$</span>
              <Field component='input' type='text' name="rent" placeholder="1370.50" />
            </div>
            <div className="sqft">  
              <label>Square Footage:</label>
              <Field component='input' type='text' name="sqft" placeholder="873" />
            </div>
            <div className="bedrooms">   
              <label>Bedrooms:</label>
              <Field component='select' name="bedrooms">
                {[...Array(9)].map((x, i) => <option value={i+1} key={i+1}>{i+1}</option> )}
              </Field>
            </div>
            <div className="bathrooms">   
              <label>Bathrooms:</label>
              <Field component='select' name="bathrooms">
                {[...Array(9)].map((x, i) => <option value={i+1} key={i+1}>{i+1}</option> )}
              </Field>
            </div>
            <div className="img" >
              <input type="file" name="img" onChange={uploadImage} />
            </div>
            <button type='submit' className='btn' onClick={() => accessModal('success')}>Submit</button>
          </form>
          
          <div className="images">
              { images.map ((img, index, images) =>
                <Image file={img} alt='some text' key={index}/>
              )}
          </div>
        </div>
      </div>
  )
}


/* ----------- *
 *  CONTAINER  *
 * ----------- */


const mapStateToProps = (state, ownProps) => {
  return {
    images: state.app.images
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    submit: function (values) {
      values.date_listed = Date.now()
      dispatch(createListing(values))
    },
    uploadImage: function (event) {
      let file = event.target.files[0]
      if (file) dispatch(addImage(file))
    },
    accessModal: function (modal) {
      dispatch(openModal(modal))
    } 
  }
}

const CreateListingContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateListingComponent)

const CreateListingForm = reduxForm({
  form: 'create'  // a unique identifier for this form
})(CreateListingContainer)

export default CreateListingForm
