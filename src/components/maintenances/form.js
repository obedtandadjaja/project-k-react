import React from 'react'
import { Field, reduxForm } from 'redux-form'

import { required } from '../../formHelpers/validators'
import renderField from '../../formHelpers/renderField'
import renderSelectField from '../../formHelpers/renderSelectField'

import styled from 'styled-components'

const Style = styled.div`
  .row{
    display:block;
  }
`

function MaintenanceForm(props) {
  const { handleSubmit, readonly, submitError, loading, title, buttonText } = props

  return (
    <Style>
      <form onSubmit={handleSubmit}>
        { /** maintenance request card */}
        <div className='row'>
          <div className='col'>
            <div className="blockCard">
              <div className="blockHeader">
                {title}
              </div>
              <div className="blockBody">
                <Field
                  name='date'
                  label='Date'
                  component={renderField}
                  validate={[required]}
                  readonly={readonly}
                  type='text' />

                <Field
                  name='property'
                  label='Property'
                  component={renderSelectField}
                  validate={[required]}
                  readonly={readonly}
                  defaultEmpty
                  options={[
                    //static data, should retrieve form sql join
                    ['propertyA', 'Property A'],
                    ['propertyB', 'Property B'],
                  ]} />

                <Field
                  name='room'
                  label='Room'
                  component={renderSelectField}
                  validate={[required]}
                  readonly={readonly}
                  defaultEmpty
                  options={[
                    //static data, should retrieve form sql join
                    ['room1', 'Room 101'],
                    ['room2', 'Room 102'],
                  ]} />

                <Field
                  name='category'
                  label='Category'
                  component={renderSelectField}
                  validate={[required]}
                  readonly={readonly}
                  defaultEmpty
                  options={[
                    //static data, should retrieve form sql join
                    ['lights', 'Lighting'],
                    ['water', 'Water Faucet'],
                  ]} />

                <Field
                  name='description'
                  label='Description'
                  component={renderField}
                  validate={[required]}
                  readonly={readonly}
                  type='text' />

                <div className='errorResponse'>
                  {submitError && JSON.stringify(submitError)}
                </div>
              </div>
            </div>
          </div>
        </div>


        { /** button card */}
        {
          !readonly &&
          <button className='button' type='submit' disabled={loading}>
            {buttonText}
          </button>
        }
      </form>
    </Style>
  )
}

let maintenanceForm = reduxForm({
  form: 'maintenance',
  enabledReinitialize: true,
})(MaintenanceForm)

export default maintenanceForm
