import React from 'react'

const renderRepeatedFields = ({
  fields,
  buttonText,
  entityText,
  childComponent,
  meta: { touched, error }
}) => (
  <div>
    <ul class='undecorated'>
      {fields.map((field, index) =>
        <li key={index} class='fieldGroup'>
          <button
            class='repeatedFieldsRemove'
            type='button'
            onClick={() => fields.remove(index)}>
            Remove
          </button>
          <h4>{entityText} #{index + 1}</h4>
          { childComponent(field) }
        </li>
      )}
      <li>
        <button type='button' onClick={() => fields.push({})}>{buttonText}</button>
        {touched && error && <span>{error}</span>}
      </li>
    </ul>
  </div>
)

export default renderRepeatedFields
