import React from 'react'

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => (
  <div class='formFieldWrapper'>
    {
      label &&
      <label htmlFor={input.name}>{label}</label>
    }
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched &&
        ((error && <p class='error'>{error}</p>) ||
        (warning && <p class='warn'>{warning}</p>))}
    </div>
  </div>
)

export default renderField
