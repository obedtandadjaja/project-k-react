import React from 'react'
import { Field } from 'redux-form'

import { required, email, phone } from './../../formHelpers/validators'
import renderField from './../../formHelpers/renderField'

function EmergencyContactFields(props) {
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
      name={prefix ? `${prefix}.address` : 'address'}
      type='text'
      component={renderField}
      readonly={readonly}
      label='Address' />
    <Field
      name={prefix ? `${prefix}.phone` : 'phone'}
      type='text'
      component={renderField}
      validate={[required, phone]}
      readonly={readonly}
      label='Phone' />
    <Field
      name={prefix ? `${prefix}.email` : 'email'}
      type='text'
      component={renderField}
      validate={[email]}
      readonly={readonly}
      label='Email' />
    </>
  )
}

export default EmergencyContactFields
