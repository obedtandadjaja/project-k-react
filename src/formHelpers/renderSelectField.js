import React from 'react'

const renderSelectField = ({
  input,
  label,
  options,
  readonly,
  defaultEmpty,
  meta: { touched, error, warning },
}) => (
  <div className='formFieldWrapper'>
    { label && <label htmlFor={input.name}>{label}</label> }
    <div>
      <select
        {...input}
        disabled={readonly}
        value={input.value ? input.value : (!defaultEmpty ? options[0][0] : '')}>
        { defaultEmpty && <option /> }
        {
          options.map((option, i) => (
            <option key={i} value={option[0]}>
              {option[1]}
            </option>
          ))
        }
      </select>
      {touched &&
         ((error && <p className='error'>{error}</p>) ||
         (warning && <p className='warn'>{warning}</p>))}
    </div>
  </div>
)

export default renderSelectField
