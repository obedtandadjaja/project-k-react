import React from 'react'
import { Field, reduxForm } from 'redux-form'

import renderField from './../../formHelpers/renderField'
import { required } from './../../formHelpers/validators'

function PaymentForm(props) {
  const { handleSubmit, readonly, submitError, loading, title, buttonText } = props

  return (
    <form onSubmit={handleSubmit} >
      <div className="blockCard">
        <div className="blockHeader">
          { title }
        </div>
        <div className="blockBody">
          <Field
            name='amount'
            type='number'
            component={renderField}
            validate={[required]}
            readonly={readonly}
            label='Amount' />
          <Field
            name='description'
            type='text'
            component={renderField}
            readonly={readonly}
            label='Description' />
          <Field
            name='created_at'
            type='date'
            component={renderField}
            readonly={readonly}
            label='Payment date' />

          {
            !readonly &&
            <button type='submit' disabled={loading}>
              { buttonText }
            </button>
          }

          <div className='errorResponse'>
            { submitError && JSON.stringify(submitError) }
          </div>
        </div>
      </div>
    </form>
  )
}

let paymentForm = reduxForm({
  form: 'payment',
  enabledReinitialize: true,
})(PaymentForm)

export default paymentForm
