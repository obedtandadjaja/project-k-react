import React from 'react'
import { connect } from 'react-redux'
import { Field, FieldArray, reduxForm } from 'redux-form'
import { formValueSelector } from 'redux-form'

import { required, email, phone } from './../../formHelpers/validators'
import renderField from './../../formHelpers/renderField'
import renderSelectField from './../../formHelpers/renderSelectField'
import RepeatedFields from './../../formHelpers/repeatedFields'
import EmergencyContactFields from './emergencyContactFields'

function UserForm(props) {
  const { handleSubmit, occupation, submitting, submitError, readonly } = props

  return (
    <form onSubmit={handleSubmit}>
      <Field
        name='name'
        label='Name'
        component={renderField}
        validate={[required]}
        readonly={readonly}
        type='text' />

      <Field
        name='email'
        label='Email'
        component={renderField}
        validate={[required, email]}
        readonly={readonly}
        type='text' />

      <Field
        name='phone'
        label='Phone'
        component={renderField}
        validate={[required, phone]}
        readonly={readonly}
        type='text' />

      <Field
        name='data.gender'
        component={renderSelectField}
        label='Gender'
        readonly={readonly}
        options={[
          ['male', 'Male'],
          ['female', 'Female'],
        ]} />

      <Field
        name='data.marriageStatus'
        component={renderSelectField}
        label='Marriage status'
        readonly={readonly}
        options={[
          ['notMarried', 'Not Married'],
          ['married', 'Married'],
        ]} />

      <Field
        name='data.religion'
        component={renderSelectField}
        label='Religion'
        readonly={readonly}
        options={[
          ['muslim', 'Muslim'],
          ['christianProtestant', 'Christian Protestant'],
          ['christianCatholic', 'Christian Catholic'],
          ['hindu', 'Hindu'],
          ['buddhist', 'Buddhist'],
          ['confucian', 'Confucian'],
          ['other', 'Other'],
        ]} />

      <div>
        <label htmlFor='identification'>Identification:</label>
        <Field
          name='data.identificationType'
          component={renderSelectField}
          readonly={readonly}
          options={[
            ['KTP ID/NIK', 'KTP ID/NIK'],
            ['KITAS ID', 'KITAS ID'],
            ['Passport Number', 'Passport Number'],
          ]} />
        <Field
          name='data.identificationValue'
          component={renderField}
          readonly={readonly}
          type='text'
          validate={[required]}
        />
      </div>

      <Field
        name='data.occupation'
        component={renderSelectField}
        label='Occupation'
        readonly={readonly}
        options={[
          ['student', 'Student'],
          ['professional', 'Professional'],
          ['unemployed', 'Unemployed'],
        ]} />

      {
        occupation === 'professional' &&
        <div>
          <h4>Company information</h4>
          <Field
            name='data.companyName'
            label='Company Name'
            component={renderField}
            readonly={readonly}
            type='text' />

          <Field
            name='data.companyAddress'
            label='Company Address'
            component={renderField}
            readonly={readonly}
            type='text' />

          <Field
            name='data.companyPhone'
            label='Company Phone'
            component={renderField}
            readonly={readonly}
            validate={[phone]}
            type='text' />
        </div>
      }

      <FieldArray
        name='data.emergencyContacts'
        buttonText='Add emergency contact'
        entityText='Emergency contact'
        readonly={readonly}
        childComponent={EmergencyContactFields}
        component={RepeatedFields} />

      {
        !readonly &&
        <button type='submit' disabled={submitting}>
          Create user
        </button>
      }

      <div className='errorResponse'>
        { JSON.stringify(submitError) }
      </div>

    </form>
  )
}

let userForm = reduxForm({
  form: 'user'
})(UserForm)

const selector = formValueSelector('user')
userForm = connect(state => ({
  occupation: selector(state, 'data.occupation'),
}))(userForm)

export default userForm
