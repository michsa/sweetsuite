import React from 'react'
import Image from 'react-image-file'

import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import { searchListings } from '../actions'

/* ----------- *
 *  COMPONENT  *
 * ----------- */
 
const SearchComponent = ({handleSubmit, submit, accessModal}) => {
  return (
      <div id="search" className="search-listings">
        <div className="title">Add New Apartment Listing</div>      
        <div className="content">
          <form onSubmit={handleSubmit(submit)}>
            <div className="nearby">
              <Field component='input' type='text' name="city" placeholder="City"/>
            </div>
            <div className="rent">  
              <label>Rent:</label>
              <span className="dollar">$</span>
              <Field component='input' type='text' name="rent" placeholder="Low" className="low" /> - 
              <Field component='input' type='text' name="rent" placeholder="High" className="high" />
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
            <button type='submit' className='btn' onClick={() => accessModal('success')}>Submit</button>
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
      values.date_listed = Date.now()
      dispatch(createListing(values))
    },
    accessModal: function (modal) {
      dispatch(openModal(modal))
    } 
  }
}

const SearchContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchComponent)

const SearchForm = reduxForm({
  form: 'create'  // a unique identifier for this form
})(SearchContainer)

export default SearchForm
