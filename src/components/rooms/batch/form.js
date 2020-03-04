import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { Button } from '@material-ui/core'

import { required } from './../../../formHelpers/validators'
import renderField from './../../../formHelpers/renderField'
import renderSelectField from './../../../formHelpers/renderSelectField'

function CreateBatchRoomForm(props) {
  const { initialValues, handleSubmit, readonly, submitError, loading, title, buttonText } = props

  return (
    <form onSubmit={handleSubmit}>
      <div className='row'>
        <div className='col'>
          <div className='blockCard'>
            <div className='blockHeader'>
              { title }
            </div>
            <div className='blockBody'>
            <Field
              name='type'
              type='text'
              component={renderField}
              validate={[required]}
              readonly={readonly}
              label='Type name' />
            <Field
              name='paymentSchedule'
              component={renderSelectField}
              validate={[required]}
              readonly={readonly}
              label='Payment schedule'
              options={[
                ['daily', 'Daily'],
                ['monthly', 'Monthly'],
                ['yearly', 'Yearly'],
              ]} />
            <Field
              name='priceAmount'
              parse={value => Number(value)}
              type='number'
              component={renderField}
              readonly={readonly}
              label='Price' />
            <Field
              name='quantity'
              parse={value => Number(value)}
              type='number'
              component={renderField}
              readonly={readonly}
              label='Quantity' />
            </div>

            <div className='errorResponse'>
              {submitError && JSON.stringify(submitError)}
            </div>
          </div>
        </div>
      </div>
      <div className='row'>
        {
          !readonly &&
          <Button variant='contained' color='primary' type='submit' disabled={loading}>
            { buttonText }
          </Button>
        }
      </div>
    </form>
  )
}

let roomBatchForm = reduxForm({
  form: 'roomBatch',
  enabledReinitialize: true,
})(CreateBatchRoomForm)

export default roomBatchForm
