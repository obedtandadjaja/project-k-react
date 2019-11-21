import React from 'react'
import { Field, FieldArray, reduxForm } from 'redux-form'

import { required } from './../../formHelpers/validators'
import renderField from './../../formHelpers/renderField'
import renderSelectField from './../../formHelpers/renderSelectField'
import RoomFields from './../rooms/fields'
import FacilityFields from './../facilities/fields'
import RepeatedFields from './../../formHelpers/repeatedFields'

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
        <RoomFields prefix={room} />
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
      <FieldArray
        name='sharedFacilities'
        buttonText='Add shared facility'
        entityText='Shared facility'
        childComponent={FacilityFields}
        component={RepeatedFields} />

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
