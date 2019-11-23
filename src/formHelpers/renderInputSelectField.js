import React from 'react'
import { Field } from 'redux-form'

import { requiredInputSelect } from './../formHelpers/validators'

const renderField = ({
  input,
  label,
  inputType,
  options,
  defaultEmpty,
  readonly,
  meta: { touched, error, warning }
}) => (
  <div className='formFieldWrapper'>
    {
      label &&
      <label htmlFor={input.name}>{label}</label>
    }
    <div>
      <Field
        name={input.name + '.type'}
        disabled={readonly}
        component='select'
        defaultValue={!defaultEmpty && options[0][0]}>
        { defaultEmpty && <option /> }
        {
          options.map((option, i) => (
            <option key={i} value={option[0]}>
              {option[1]}
            </option>
          ))
        }
      </Field>
      <Field
        name={input.name + '.value'}
        type={inputType}
        disabled={readonly}
        component='input' />
      {touched &&
       ((error && <p className='error'>{error}</p>) ||
        (warning && <p className='warn'>{warning}</p>))}
    </div>
  </div>
)

export default renderField
