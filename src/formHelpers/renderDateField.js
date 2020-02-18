// https://material-ui-pickers.dev/ , https://stackoverflow.com/questions/42422269/datepicker-in-redux-form

import React from 'react'
import moment from 'moment'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material/pickers'

const renderDateField = ({
  input,
  label,
  format,
  defaultEmpty,
  meta: { touched, error, warning }
}) => (
  <div className='formFieldWrapper'>
    <MuiPickersUtilsProvider utils={moment}>
      <KeyboardDatePicker 
        {...input}
        disableToolbar
        variant='inline'
        format={format}
        margin='normal'
        label={label}
        value={input.value ? moment(input.value) : null}
        KeyboardButtonProps={{
        'aria-label': 'change date',
      }} />
    </MuiPickersUtilsProvider>
  </div>
)

export default renderDateField