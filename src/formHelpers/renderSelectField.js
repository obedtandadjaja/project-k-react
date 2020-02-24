import React from 'react'
import { FormControl, InputLabel, Select, Typography, MenuItem } from '@material-ui/core'

import FormFieldWrapper from './../styledComponents/formFieldWrapper'

const renderSelectField = ({
  input,
  label,
  options,
  readonly,
  defaultEmpty,
  meta: { touched, error, warning },
}) => (
  <FormFieldWrapper>
    <FormControl variant='outlined'>
      { label && <InputLabel htmlFor={input.name}>{label}</InputLabel>}
      <Select
        {...input}
        disabled={readonly}
        displayEmpty={defaultEmpty}
        defaultValue={input.value ? input.value : (!defaultEmpty ? options[0][0] : '')}>
        {
          options.map((option, i) => (
            <MenuItem key={i} value={option[0]}>
              {option[1]}
            </MenuItem>
          ))
        }
      </Select>
      {touched &&
         ((error && <Typography color='error'>{error}</Typography>) ||
         (warning && <Typography color='warn'>{warning}</Typography>))}
    </FormControl>
  </FormFieldWrapper>
)

export default renderSelectField
