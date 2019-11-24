import React from 'react'
import { Field } from 'redux-form'

import { required } from './../../formHelpers/validators'
import renderField from './../../formHelpers/renderField'
import renderSelectField from './../../formHelpers/renderSelectField'

function RoomFields(props) {
  const { prefix, readonly } = props

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
    </>
  )
}

export default RoomFields
