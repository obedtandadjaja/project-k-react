import React from 'react'
import { Field } from 'redux-form'
import { Typography, Grid } from '@material-ui/core'

import renderSelectField from './renderSelectField'
import renderCheckboxField from './renderCheckboxField'

const renderSelectCheckField = ({
  input,
  label,
  options,
  defaultEmpty,
}) => (
  <>
    <Typography component='label'>{label}</Typography>
    <Grid container direction='row' justify='center' alignItems='center' spacing={1}>
      <Grid item xs={10}>
        <Field
          name={`${input.name}.value`}
          defaultEmpty={defaultEmpty}
          options={options}
          component={renderSelectField} />
      </Grid>
      <Grid item>
        <Field
          name={`${input.name}.check`}
          component={renderCheckboxField} />
      </Grid>
    </Grid>
  </>
  )

export default renderSelectCheckField
