import React from 'react'
import { Field, FieldArray } from 'redux-form'

import { required } from './../../formHelpers/validators'
import renderField from './../../formHelpers/renderField'
import renderSelectField from './../../formHelpers/renderSelectField'
import FacilityFields from './../facilities/fields'
import RepeatedFields from './../../formHelpers/repeatedFields'

function RoomFields(props) {
  const { prefix } = props

  return (
    <>
      <Field
        name={prefix ? `${prefix}.name` : 'name'}
        type='text'
        component={renderField}
        validate={[required]}
        label='Name' />
      <Field
        name={prefix ? `${prefix}.paymentSchedule` : 'paymentSchedule'}
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
        name={prefix ? `${prefix}.priceAmount` : 'priceAmount'}
        type='number'
        component={renderField}
        label='Price' />

      <FieldArray
        name={prefix ? `${prefix}.facilities` : 'facilities'}
        buttonText='Add facility'
        entityText='Facility'
        childComponent={FacilityFields}
        component={RepeatedFields}>
      </FieldArray>
    </>
  )
}

export default RoomFields
