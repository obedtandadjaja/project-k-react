import React from 'react'
import { connect } from 'react-redux'
import { Field, FieldArray, reduxForm } from 'redux-form'
import { formValueSelector } from 'redux-form'

import { required, email, phone } from './../../formHelpers/validators'
import renderField from './../../formHelpers/renderField'
import renderSelectField from './../../formHelpers/renderSelectField'

function UserForm(props) {
  const { handleSubmit, occupation  } = props

  const renderEmergencyContacts = ({ fields, meta: { touched, error } }) => (
    <ul>
      <li>
        <button type="button" onClick={() => fields.push({})}>Add Emergency Contact</button>
        {touched && error && <span>{error}</span>}
      </li>
      {fields.map((emergencyContact, index) =>
        <li key={index}>
          <button
            type="button"
            onClick={() => fields.remove(index)} />
          <h4>Emergency contact #{index + 1}</h4>
          <Field
            name={`${emergencyContact}.name`}
            type="text"
            component={renderField}
            validate={[required]}
            label="Name" />
          <Field
            name={`${emergencyContact}.address`}
            type="text"
            component={renderField}
            label="Address" />
          <Field
            name={`${emergencyContact}.phone`}
            type="text"
            component={renderField}
            validate={[required, phone]}
            label="Phone" />
          <Field
            name={`${emergencyContact}.email`}
            type="text"
            component={renderField}
            label="Email" />
        </li>
      )}
    </ul>
  )

  return (
    <form onSubmit={handleSubmit} >
      <Field
        name="name"
        label="Name"
        component={renderField}
        validate={[required]}
        type="text" />

      <Field
        name="email"
        label="Email"
        component={renderField}
        validate={[required, email]}
        type="text" />

      <Field
        name="phone"
        label="Phone"
        component={renderField}
        validate={[required, phone]}
        type="text" />

      <Field
        name='gender'
        component={renderSelectField}
        defaultEmpty
        validate={[required]}
        label='Gender'
        options={[
          ["male", "Male"],
          ["female", "Female"],
        ]} />

      <Field
        name='marriageStatus'
        component={renderSelectField}
        defaultEmpty
        validate={[required]}
        label='Marriage status'
        options={[
          ["notMarried", "Not Married/Others"],
          ["married", "Married"],
        ]} />

      <Field
        name='religion'
        component={renderSelectField}
        defaultEmpty
        validate={[required]}
        label='Religion'
        options={[
          ["muslim", "Muslim"],
          ["christianProtestant", "Christian Protestant"],
          ["christianCatholic", "Christian Catholic"],
          ["hindu", "Hindu"],
          ["buddhist", "Buddhist"],
          ["confucian", "Confucian"],
          ["other", "Other"],
        ]} />

      <div>
        <label htmlFor='identification'>Identification:</label>
        <Field
          name='identificationType'
          component={renderSelectField}
          defaultEmpty
          validate={[required]}
          options={[
            ["KTP ID/NIK", "KTP ID/NIK"],
            ["KITAS ID", "KITAS ID"],
            ["Passport Number", "Passport Number"],
          ]} />
        <Field
          name='identificationValue'
          component={renderField}
          type='text'
          validate={[required]}
        />
      </div>

      <Field
        name='occupation'
        component={renderSelectField}
        defaultEmpty
        validate={[required]}
        label='Occupation'
        options={[
          ["student", "Student"],
          ["professional", "Professional"],
          ["unemployed", "Unemployed"],
        ]} />

      {
        occupation === 'professional' &&
        <div>
          <h2>Company information</h2>
          <Field
            name="companyName"
            label="Company Name"
            component={renderField}
            type="text" />

          <Field
            name="companyAddress"
            label="Company Address"
            component={renderField}
            type="text" />

          <Field
            name="companyPhone"
            label="Company Phone"
            component={renderField}
            validate={[phone]}
            type="text" />
        </div>
      }

      <FieldArray name="emergencyContacts" component={renderEmergencyContacts}/>
      <button type='submit'>
        Submit
      </button>
    </form>
  )
}


let userForm = reduxForm({
  form: 'user'
})(UserForm)

const selector = formValueSelector('user')
userForm = connect(state => ({
  occupation: selector(state, 'occupation') }))(userForm)

export default userForm
