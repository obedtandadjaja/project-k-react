import React from 'react'
import { Field, FieldArray, reduxForm } from 'redux-form'

import { required } from './../../formHelpers/validators'
import renderField from './../../formHelpers/renderField'
import renderSelectField from './../../formHelpers/renderSelectField'
import RoomFields from './../rooms/fields'
import FacilityFields from './../facilities/fields'
import RepeatedFields from './../../formHelpers/repeatedFields'

function PropertyForm(props) {
  const { handleSubmit, readonly, submitError, loading, buttonText } = props

  return (
    <form onSubmit={handleSubmit} >
      <div className="blockCard">
        <div className="blockHeader">
          Add property
        </div>
        <div className="blockBody">
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

          {
            !readonly &&
            <button type='submit' disabled={loading}>
              { buttonText }
            </button>
          }

          <div className='errorResponse'>
            { JSON.stringify(submitError) }
          </div>
        </div>
      </div>

      <div className="blockCard">
        <div className="blockHeader">
          Rooms
        </div>
        <div className="blockBody">
          <FieldArray
            name='rooms'
            buttonText='Add room'
            entityText='Room'
            readonly={readonly}
            childComponent={RoomFields}
            component={RepeatedFields} />
        </div>
      </div>

      <div className="blockCard">
        <div className="blockHeader">
          Shared facilities
        </div>
        <div className="blockBody">
          <FieldArray
            name='sharedFacilities'
            buttonText='Add shared facility'
            entityText='Shared facility'
            readonly={readonly}
            childComponent={FacilityFields}
            component={RepeatedFields} />
        </div>
      </div>
    </form>
  )
}

let propertyForm = reduxForm({
  form: 'property'
})(PropertyForm)

export default propertyForm
