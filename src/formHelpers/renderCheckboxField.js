import React from 'react'
import { Checkbox } from '@material-ui/core'

import FormFieldWrapper from './../styledComponents/formFieldWrapper'

const renderCheckboxField = ({
  input,
}) => (
    <FormFieldWrapper>
      <Checkbox
        defaultChecked
        checked={input.value ? true : false}
        onChange={input.onChange} />
    </FormFieldWrapper>
  )

export default renderCheckboxField
