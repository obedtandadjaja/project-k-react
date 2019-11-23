import React from 'react'

const renderRepeatedFields = ({
  fields,
  buttonText,
  entityText,
  readonly,
  childComponent,
  meta: { touched, error }
}) => (
  <div>
    {
      readonly &&
      fields.length === 0 &&
      `No ${entityText}`
    }
    <ul className='undecorated'>
      {fields.map((field, index) =>
        <li key={index} className='fieldGroup'>
          {
            !readonly &&
            <button
              className='repeatedFieldsRemove link error'
              type='button'
              onClick={() => fields.remove(index)}>
              Remove
            </button>
          }
          <h4>{entityText} #{index + 1}</h4>
          { childComponent(field, readonly) }
        </li>
      )}
      {
        !readonly &&
        <li>
          <button
            className='link'
            type='button'
            onClick={() => fields.push({})}>
            { buttonText }
          </button>
          {touched && error && <span>{error}</span>}
        </li>
      }
    </ul>
  </div>
)

export default renderRepeatedFields
