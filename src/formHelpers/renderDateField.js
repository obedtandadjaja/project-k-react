import React from 'react'
import moment from 'moment'
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'

const renderDateField = ({
  input: { value, onChange },
  label,
}) => (
  <div className='formFieldWrapper' id='date-picker'>
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <KeyboardDatePicker 
        disableToolbar
        format='YYYY-MM-DD'
        label={label}
        value={value ? moment(value) : moment()}
        onChange={onChange}
        KeyboardButtonProps={{
        'aria-label': 'change date',
        }} />
    </MuiPickersUtilsProvider>
  </div>
)

export default renderDateField