import React from 'react'
import { FieldArray, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import { Button, Box } from '@material-ui/core'

import RoomFields from './../rooms/fields'
import FacilityFields from './../facilities/fields'
import RepeatedFields from './../../formHelpers/repeatedFields'

function RoomForm(props) {
  const { initialValues, handleSubmit, readonly, submitError, loading, title, buttonText } = props

  return (
    <form onSubmit={handleSubmit}>
      <div className='row'>
        <div className='col'>
          <div className='blockCard'>
            <div className='blockHeader'>
              { title }
            </div>
            <div className='blockBody'>
              <RoomFields readonly={readonly} />
              <div className='errorResponse'>
                { submitError && JSON.stringify(submitError) }
              </div>
            </div>
          </div>
        </div>

        <div className='col'>
          <div className='blockCard'>
            <div className='blockHeader'>
              Room facilities
            </div>
            <div className='blockBody'>
              <FieldArray
                name='data.facilities'
                buttonText='Add room facility'
                entityText='Room facility'
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
                Tenants
              </div>
              <div className='blockBody'>
                {
                  initialValues.tenants &&
                  initialValues.tenants.map(tenant => (
                    <Box alignItems='flex-start' px={0} pb={2} key={tenant.id}>
                      <Button
                        component={Link}
                        variant='contained'
                        color='primary'
                        size='large'
                        to={{ pathname: `/properties/${initialValues.propertyId}/rooms/${initialValues.id}/tenants/${tenant.id}` }}>
                        {tenant.name}
                      </Button>
                    </Box>
                  ))
                }
                <Button 
                  variant='contained'
                  color='primary'
                  component={Link} 
                  size='small'
                  to={{ pathname: `/properties/${initialValues.propertyId}/rooms/${initialValues.id}/tenants/create` }}>
                    + Add a tenant
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

let roomForm = reduxForm({
  form: 'room',
  enabledReinitialize: true,
})(RoomForm)

export default roomForm
