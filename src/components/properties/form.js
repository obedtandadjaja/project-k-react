import React from 'react'
import { Field, FieldArray, reduxForm } from 'redux-form'

import { required } from './../../formHelpers/validators'
import renderField from './../../formHelpers/renderField'
import renderSelectField from './../../formHelpers/renderSelectField'

const renderFacilities = ({ fields, buttonText, meta: { touched, error } }) => (
  <ul>
    <li>
      <button type='button' onClick={() => fields.push({})}>{buttonText}</button>
      {touched && error && <span>{error}</span>}
    </li>
    {fields.map((facility, index) =>
      <li key={index}>
        <button
          type='button'
          onClick={() => fields.remove(index)} />
        <h4>Facility #{index + 1}</h4>
        <Field
          name={`${facility}.name`}
          type='text'
          component={renderField}
          validate={[required]}
          label='Name' />
      </li>
    )}
  </ul>
)

const renderRooms = ({ fields, meta: { touched, error } }) => (
  <ul>
    <li>
      <button type='button' onClick={() => fields.push({})}>Add Room</button>
      {touched && error && <span>{error}</span>}
    </li>
    {fields.map((room, index) =>
      <li key={index}>
        <button
          type='button'
          onClick={() => fields.remove(index)} />
        <h4>Room #{index + 1}</h4>
        <Field
          name={`${room}.name`}
          type='text'
          component={renderField}
          validate={[required]}
          label='Name' />
        <Field
          name={`${room}.paymentSchedule`}
          component={renderSelectField}
          defaultEmpty
          validate={[required]}
          label='Payment schedule'
          options={[
            ['daily', 'Daily'],
            ['monthly', 'Monthly'],
            ['yearly', 'Yearly'],
          ]} />
        <Field
          name={`${room}.priceAmount`}
          type='number'
          component={renderField}
          label='Price' />

        <FieldArray
          name={`${room}.facilities`}
          buttonText='Add facility'
          component={renderFacilities}/>
      </li>
    )}
  </ul>
)

function PropertyForm(props) {
  const { handleSubmit } = props

  return (
    <form onSubmit={handleSubmit} >
      <Field
        name='name'
        label='Name'
        component={renderField}
        validate={[required]}
        type='text' />

      <Field
        name='address'
        label='Address'
        component={renderField}
        validate={[required]}
        type='text' />

      <Field
        name='type'
        component={renderSelectField}
        defaultEmpty
        validate={[required]}
        label='type'
        options={[
          ['apartment', 'Apartment'],
          ['house', 'House'],
        ]} />

      <FieldArray name='rooms' component={renderRooms} />
      <FieldArray name='sharedFacilities' buttonText='Add shared facility' component={renderFacilities}/>

      <button type='submit'>
        Submit
      </button>
    </form>
  )
}

let propertyForm = reduxForm({
  form: 'property'
})(PropertyForm)

export default propertyForm
