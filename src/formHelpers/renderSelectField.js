import React from 'react'

const renderSelectField = ({
  input,
  label,
  options,
  defaultEmpty,
  meta: { touched, error, warning },
}) => (
  <div class='formFieldWrapper'>
    { label && <label htmlFor={input.name}>{label}</label> }
    <div>
      <select {...input}>
        { defaultEmpty && <option /> }
        {
          options.map((option, i) => (
            <option key={i} value={option[0]}>{option[1]}</option>
          ))
        }
      </select>
      {touched &&
         ((error && <p class='error'>{error}</p>) ||
         (warning && <p class='warn'>{warning}</p>))}
    </div>
  </div>
)

export default renderSelectField
