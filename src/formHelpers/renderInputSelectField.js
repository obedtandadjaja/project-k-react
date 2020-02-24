import React from 'react'
import { Field } from 'redux-form'
import { Typography } from '@material-ui/core'

import renderField from './renderField'
import renderSelectField from './renderSelectField'

const renderInputSelectField = ({
  input,
  label,
  inputType,
  options,
  defaultEmpty,
  readonly,
  meta: { touched, error, warning }
}) => (
  <>
  <Field
    name={`${input.name}.type`}
    defaultEmpty={defaultEmpty}
    options={options}
    readonly={readonly}
    label={`${label} type`}
    component={renderSelectField} />

  <Field
    name={`${input.name}.value`}
    type={inputType}
    readonly={readonly}
    label={`${label} value`}
    component={renderField} />

    {touched &&
     ((error && <Typography className='error'>{error}</Typography>) ||
      (warning && <Typography className='warn'>{warning}</Typography>))}
  </>
)

export default renderInputSelectField
