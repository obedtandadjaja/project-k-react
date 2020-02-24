import React from 'react'
import { Field, FieldArray, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import { Button, Box } from '@material-ui/core'

import { required } from './../../formHelpers/validators'
import renderField from './../../formHelpers/renderField'
import renderSelectField from './../../formHelpers/renderSelectField'
import FacilityFields from './../facilities/fields'
import RepeatedFields from './../../formHelpers/repeatedFields'

function PropertyForm(props) {
  const { handleSubmit, readonly, submitError, loading, title, buttonText, initialValues } = props
  
  return (
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
        <div className='col'>
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
                    <Box alignItems='flex-start' px={0} pb={2}>
                      <Button
                        key={room.id}
                        component={Link}
                        variant='contained'
                        color='primary'
                        size='large'
                        to={{ pathname: `/properties/${initialValues.id}/rooms/${room.id}` }}>
                        {room.name}
                      </Button>
                    </Box>
                  ))
                }
                <Button 
                  variant='contained'
                  color='primary'
                  component={Link} 
                  size='small'
                  to={{ pathname: `/properties/${initialValues.id}/rooms/create` }}>
                    + Add a room
                </Button>
              </div>
            </div>
          }
        </div>
      </div>

      <div className='row'>
        {
          !readonly &&
          <Button variant='contained' color='primary' type='submit' disabled={loading}>
            {buttonText}
          </Button>
        }
      </div>
    </form>
  )
}

let propertyForm = reduxForm({
  form: 'property',
  enabledReinitialize: true,
})(PropertyForm)

export default propertyForm
