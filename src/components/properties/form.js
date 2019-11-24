import React from 'react'
import { Field, FieldArray, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'

import { required } from './../../formHelpers/validators'
import renderField from './../../formHelpers/renderField'
import renderSelectField from './../../formHelpers/renderSelectField'
import FacilityFields from './../facilities/fields'
import RepeatedFields from './../../formHelpers/repeatedFields'

function PropertyForm(props) {
  const { handleSubmit, readonly, submitError, loading, title, buttonText, initialValues } = props

  return (
    <form onSubmit={handleSubmit} >
      <div className="blockCard">
        <div className="blockHeader">
          { title }
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
            { submitError && JSON.stringify(submitError) }
          </div>
        </div>
      </div>

      <div className="blockCard">
        <div className="blockHeader">
          Shared facilities
        </div>
        <div className="blockBody">
          <FieldArray
            name='data.sharedFacilities'
            buttonText='Add shared facility'
            entityText='Shared facility'
            readonly={readonly}
            ChildComponent={FacilityFields}
            component={RepeatedFields} />
        </div>
      </div>

      {
        readonly &&
        <div className="blockCard">
          <div className="blockHeader">
            Rooms
          </div>
          <div className="blockBody">
            {
              initialValues.rooms &&
              initialValues.rooms.map(room => (
                <Link key={room.id}
                  to={{ pathname: `/properties/${initialValues.id}/rooms/${room.id}` }}>
                  <div className="card bordered">
                    <h4>{ room.name }</h4>
                    <p>Payment schedule: { room.paymentSchedule }</p>
                    <p>Price: { room.price }</p>
                  </div>
                </Link>
              ))
            }
          </div>
        </div>
      }
    </form>
  )
}

let propertyForm = reduxForm({
  form: 'property',
  enabledReinitialize: true,
})(PropertyForm)

export default propertyForm
