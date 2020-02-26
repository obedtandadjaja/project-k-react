import React from 'react'
import { Field } from 'redux-form'
import { Typography, Grid } from '@material-ui/core'

import renderSelectField from './renderSelectField'
import renderDateField from './renderDateField'
import renderCheckboxField from './renderCheckboxField'

const renderSelectDateCheckField = ({
  input,
  label,
  options,
  defaultEmpty,
}) => (
    <>
      <Typography component='label'>{label}</Typography>
      <Grid container direction='row' justify='center' spacing={1}>
        <Grid item xs={4}>
          <Field
            name={`${input.name}.params`}
            defaultEmpty={defaultEmpty}
            options={options}
            component={renderSelectField} />
        </Grid>
        <Grid item xs={6}>
          <Field
            name={`${input.name}.value`}
            component={renderDateField} />
        </Grid>
        <Grid item>
          <Field
            name={`${input.name}.check`}
            component={renderCheckboxField} />
        </Grid>
      </Grid>
    </>
  )

export default renderSelectDateCheckField
