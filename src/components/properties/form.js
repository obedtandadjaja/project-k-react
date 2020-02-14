import React from 'react'
import { Field, FieldArray, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { required } from './../../formHelpers/validators'
import renderField from './../../formHelpers/renderField'
import renderSelectField from './../../formHelpers/renderSelectField'
import FacilityFields from './../facilities/fields'
import RepeatedFields from './../../formHelpers/repeatedFields'

const Style = styled.div`
  .row{
    display: block;
  }
`

function PropertyForm(props) {
  const { handleSubmit, readonly, submitError, loading, title, buttonText, initialValues } = props

  return (
    <Style>
      <form onSubmit={handleSubmit}>
        <div className='row'>
          <div className='col'>
            <div className='blockCard'>
              <div className='blockHeader'>
                {title}
              </div>
              <div className='blockBody'>
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
                  defaultEmpty
                  options={[
                    ['apartment', 'Apartment'],
                    ['house', 'House'],
                  ]} />

                <div className='errorResponse'>
                  {submitError && JSON.stringify(submitError)}
                </div>
              </div>
            </div>
          </div>

          <div className='col'>
            <div className='blockCard'>
              <div className='blockHeader'>
                Shared facilities
              </div>
              <div className='blockBody'>
                <FieldArray
                  name='data.sharedFacilities'
                  buttonText='+ Shared facility'
                  entityText='Shared facility'
                  readonly={readonly}
                  ChildComponent={FacilityFields}
                  component={RepeatedFields} />
              </div>
            </div>
          </div>
        </div>
        <div className='row'>
          {
            readonly &&
            <div className='blockCard'>
              <div className='blockHeader'>
                Rooms
            </div>
              <div className='blockBody'>
                {
                  initialValues.rooms &&
                  initialValues.rooms.map(room => (
                    <Link
                      key={room.id}
                      to={{ pathname: `/properties/${initialValues.id}/rooms/${room.id}` }}>
                      <div className='card bordered'>
                        <h4>{room.name}</h4>
                        <p>Payment schedule: {room.paymentSchedule}</p>
                        <p>Price: {room.priceAmount}</p>
                      </div>
                    </Link>
                  ))
                }
                <Link to={{ pathname: `/properties/${initialValues.id}/rooms/create` }}>
                  <button className='link'>
                    Add a room
                </button>
                </Link>
              </div>
            </div>
          }
        </div>
        {
          !readonly &&
          <button className='btn' type='submit' disabled={loading}>
            {buttonText}
          </button>
        }
      </form>
    </Style>
  )
}

let propertyForm = reduxForm({
  form: 'property',
  enabledReinitialize: true,
})(PropertyForm)

export default propertyForm
