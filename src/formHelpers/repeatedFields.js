import React from 'react'

const renderRepeatedFields = ({
  fields,
  buttonText,
  entityText,
  childComponent,
  meta: { touched, error }
}) => (
  <ul>
    <li>
      <button type='button' onClick={() => fields.push({})}>{buttonText}</button>
      {touched && error && <span>{error}</span>}
    </li>
    {fields.map((field, index) =>
      <li key={index}>
        <button
          type='button'
          onClick={() => fields.remove(index)} />
        <h4>{entityText} #{index + 1}</h4>
        { childComponent(field) }
      </li>
    )}
  </ul>
)

export default renderRepeatedFields
