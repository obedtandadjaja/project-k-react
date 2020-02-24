import React from 'react'
import { TextField, Typography } from '@material-ui/core'

import FormFieldWrapper from './../styledComponents/formFieldWrapper'

const renderField = ({
  input,
  label,
  type,
  readonly,
  meta: { touched, error, warning }
}) => (
  <FormFieldWrapper>
    <TextField
      {...input}
      fullWidth
      label={label}
      type={type}
      InputLabelProps={{ shrink: true }}
      variant='outlined'
      disabled={readonly} />
    {touched &&
      ((error && <Typography color='error'>{error}</Typography>) ||
      (warning && <Typography color='warn'>{warning}</Typography>))}
  </FormFieldWrapper>
)

export default renderField
