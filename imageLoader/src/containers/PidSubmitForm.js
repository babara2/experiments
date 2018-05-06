import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { onSubmit } from '../actions/index'
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import { Input, Button } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

// default photo set ID
const pid = '72157626579923453'

// Function to ensure that the picId field in non-empty before submitting
const validate = values => {
  const errors = {}
  if (!values.picId) {
    errors.picId = 'Photo set ID required.'
  }
  return errors
}

// Function to render the input for fields on the form
const renderInput = ({input, meta, label, placeholder }) =>
  <div className = {
    [
    meta.error && meta.touched ? 'error':'', 
    meta.active? 'active':''
    ].join(' ')}
  >
    <div>
      <label>
        <h2>{label}</h2>
      </label>
      <Input {...input} placeholder = {placeholder} />
    </div>
    <div>
      {meta.error && meta.touched && !meta.active &&
        <span> 
          {meta.error} {/*displaying errors in input*/}
        </span>}
    </div>
  </div>

// Form instantiation
let PidSubmitForm = ({ handleSubmit, submitting}) =>
<form onSubmit = {handleSubmit}>
<Field name="picId" label = "Photoset ID"
 placeholder = {pid} component = {renderInput} />
<Button className="picIdSubmit" type="submit" 
  disabled={submitting}>Submit</Button>
</form>

// Typechecking/Validating props
PidSubmitForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

// Connecting actions
function matchDispatchToProps(dispatch){
    return bindActionCreators({
      onSubmit: onSubmit
    }, dispatch);
}

// Form configuration
PidSubmitForm = reduxForm({
  form: 'pidSubmit',
  destroyOnUnmount: false,
  onSubmit: onSubmit,
  validate
})(PidSubmitForm)

//Connecting PidForm submit to actions and consequently the state store
export default connect(null, matchDispatchToProps)(PidSubmitForm)