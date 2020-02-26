import React from 'react'
import moment from 'moment'
import MomentUtils from '@date-io/moment'
import { MuiPickersUtilsProvider, DatePicker  } from '@material-ui/pickers'

const renderDateField = ({
  input: { value, onChange },
  label,
}) => (
  <div className='formFieldWrapper' id='date-picker'>
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <DatePicker   
        disableToolbar
        inputVariant="outlined"
        allowKeyboardControl={false}
        format='YYYY-MM-DD'
        label={label}
        value={value ? moment(value) : moment()}
        onChange={onChange} />
    </MuiPickersUtilsProvider>
  </div>
)

export default renderDateField
