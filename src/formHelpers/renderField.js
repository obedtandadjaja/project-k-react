import React from 'react'

const renderField = ({
  input,
  label,
  type,
  readonly,
  meta: { touched, error, warning }
}) => (
  <div className='formFieldWrapper'>
    <div>
      {readonly && 
        <label>{label}</label>}
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
