import React from 'react'
import { Field, FieldArray, reduxForm } from 'redux-form'

import { required } from './../../formHelpers/validators'
import renderField from './../../formHelpers/renderField'
import renderSelectField from './../../formHelpers/renderSelectField'
import RoomFields from './../rooms/fields'
import FacilityFields from './../facilities/fields'
import RepeatedFields from './../../formHelpers/repeatedFields'

function PropertyForm(props) {
  const { handleSubmit, readonly } = props

  return (
    <form onSubmit={handleSubmit} >
      <h1>Add property</h1>
      <Field
        name='name'
        label='Name'
        component={renderField}
        validate={[required]}
        readonly={readonly}
        type='text' />

      <Field
        name='address'
        label='Address'
        component={renderField}
        validate={[required]}
        readonly={readonly}
        type='text' />

      <Field
        name='type'
        component={renderSelectField}
        validate={[required]}
        label='Type'
        readonly={readonly}
        options={[
          ['apartment', 'Apartment'],
          ['house', 'House'],
        ]} />

      <FieldArray
        name='rooms'
        buttonText='Add room'
        entityText='Room'
        readonly={readonly}
        childComponent={RoomFields}
        component={RepeatedFields} />
      <FieldArray
        name='sharedFacilities'
        buttonText='Add shared facility'
        entityText='Shared facility'
        readonly={readonly}
        childComponent={FacilityFields}
        component={RepeatedFields} />

      {
        !readonly &&
        <button type='submit'>
          Submit
        </button>
      }
    </form>
  )
}

let propertyForm = reduxForm({
  form: 'property'
})(PropertyForm)

export default propertyForm
