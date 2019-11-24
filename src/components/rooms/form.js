import React from 'react'
import { FieldArray, reduxForm } from 'redux-form'

import RoomFields from './../rooms/fields'
import FacilityFields from './../facilities/fields'
import RepeatedFields from './../../formHelpers/repeatedFields'

function RoomForm(props) {
  const { handleSubmit, readonly, submitError, loading, title, buttonText } = props

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
    </form>
  )
}

let roomForm = reduxForm({
  form: 'room',
  enabledReinitialize: true,
})(RoomForm)

export default roomForm
