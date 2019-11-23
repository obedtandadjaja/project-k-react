import React from 'react'

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
      <select
        name={input.name + 'Type'}
        disabled={readonly}
        defaultValue={!defaultEmpty && options[0][0]}>
        { defaultEmpty && <option /> }
        {
          options.map((option, i) => (
            <option key={i} value={option[0]}>
              {option[1]}
            </option>
          ))
        }
      </select>
      <input
        name={input.name + 'Value'}
        type={inputType}
        disabled={readonly} />
      {touched &&
       ((error && <p className='error'>{error}</p>) ||
        (warning && <p className='warn'>{warning}</p>))}
    </div>
  </div>
)

export default renderField
