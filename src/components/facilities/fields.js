import React from 'react'
import { Field } from 'redux-form'

import { required } from './../../formHelpers/validators'
import renderField from './../../formHelpers/renderField'

function FacilityFields(props) {
  const { prefix, readonly} = props

  return (
    <>
      <Field
        name={prefix ? `${prefix}.name` : 'name'}
        type='text'
        component={renderField}
        validate={[required]}
        readonly={readonly}
        label='Name' />
    </>
  )
}

export default FacilityFields
