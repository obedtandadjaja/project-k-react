import React from 'react'
import { Field, FieldArray } from 'redux-form'

import { required } from './../../formHelpers/validators'
import renderField from './../../formHelpers/renderField'
import renderSelectField from './../../formHelpers/renderSelectField'
import FacilityFields from './../facilities/fields'
import RepeatedFields from './../../formHelpers/repeatedFields'

function RoomFields(prefix, readonly) {
  return (
    <>
      <Field
        name={prefix ? `${prefix}.name` : 'name'}
        type='text'
        component={renderField}
        validate={[required]}
        readonly={readonly}
        label='Name' />
      <Field
        name={prefix ? `${prefix}.paymentSchedule` : 'paymentSchedule'}
        component={renderSelectField}
        defaultEmpty
        validate={[required]}
        label='Payment schedule'
        readonly={readonly}
        options={[
          ['daily', 'Daily'],
          ['monthly', 'Monthly'],
          ['yearly', 'Yearly'],
        ]} />
      <Field
        name={prefix ? `${prefix}.priceAmount` : 'priceAmount'}
        parse={value => Number(value)}
        type='number'
        component={renderField}
        readonly={readonly}
        label='Price' />

      <FieldArray
        name={prefix ? `${prefix}.data.facilities` : 'data.facilities'}
        buttonText='Add facility'
        entityText='Facility'
        readonly={readonly}
        childComponent={FacilityFields}
        component={RepeatedFields} />
    </>
  )
}

export default RoomFields
