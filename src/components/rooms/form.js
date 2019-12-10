import React from 'react'
import { FieldArray, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'

import RoomFields from './../rooms/fields'
import FacilityFields from './../facilities/fields'
import RepeatedFields from './../../formHelpers/repeatedFields'

function RoomForm(props) {
  const { initialValues, handleSubmit, readonly, submitError, loading, title, buttonText } = props

  return (
    <form onSubmit={handleSubmit} >
      <div className="blockCard">
        <div className="blockHeader">
          { title }
        </div>
        <div className="blockBody">
          <RoomFields readonly={readonly} />

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
          Room facilities
        </div>
        <div className="blockBody">
          <FieldArray
            name='data.facilities'
            buttonText='Add room facility'
            entityText='Room facility'
            readonly={readonly}
            ChildComponent={FacilityFields}
            component={RepeatedFields} />
        </div>
      </div>

      {
        readonly &&
        <div className="blockCard">
          <div className="blockHeader">
            Tenants
          </div>
          <div className="blockBody">
            {
              initialValues.tenants &&
              initialValues.tenants.map(tenant => (
                <Link
                  key={tenant.id}
                  to={{ pathname: `/properties/${initialValues.propertyId}/rooms/${initialValues.id}/tenants/${tenant.id}` }}>
                  <div className="card bordered">
                    <h4>{ tenant.name }</h4>
                    <p>Email: { tenant.email }</p>
                    <p>Phone: { tenant.phone }</p>
                    {
                      tenant.data.identification &&
                      <p>Identification: { tenant.data.identification.type } {tenant.data.identification.value}</p>
                    }
                  </div>
                </Link>
              ))
            }

            <Link to={{ pathname: `/properties/${initialValues.propertyId}/rooms/${initialValues.id}/tenants/create` }}>
              <button className='link'>
                Add a tenant
              </button>
            </Link>
          </div>
        </div>
      }
    </form>
  )
}

let roomForm = reduxForm({
  form: 'room',
  enabledReinitialize: true,
})(RoomForm)

export default roomForm
