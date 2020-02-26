import React from 'react'
import { Field } from 'redux-form'
import { Typography, Grid } from '@material-ui/core'

import renderSelectField from './renderSelectField'
import renderCheckboxField from './renderCheckboxField'

const renderSelectCheckField = ({
  input,
  label,
  optionsParams,
  optionsValue,
  defaultEmpty,
}) => (
  <>
    <Typography>{label}</Typography>
    <Grid container direction='row'>
      <Field
        name={`${input.name}.params`}
        defaultEmpty={defaultEmpty}
        options={optionsParams}
        readonly={true}
        component={renderSelectField} />

      <Field
        name={`${input.name}.value`}
        defaultEmpty={defaultEmpty}
        options={optionsValue}
        component={renderSelectField} />

      <Field  
        name={`${input.name}.check`}
        component={renderCheckboxField} />

    </Grid>
  </>
  )

export default renderSelectCheckField
