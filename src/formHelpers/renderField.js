import React from 'react'

const renderField = ({
  input,
  label,
  type,
  readonly,
  meta: { touched, error, warning }
}) => (
  <div className='formFieldWrapper'>
    {
      label &&
      <label htmlFor={input.name}>{label}</label>
    }
    <div>
      <input
        {...input}
        placeholder={ !readonly ? label : '' }
        type={type}
        disabled={readonly} />
      {touched &&
        ((error && <p className='error'>{error}</p>) ||
        (warning && <p className='warn'>{warning}</p>))}
    </div>
  </div>
)

export default renderField
