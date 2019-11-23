import React from 'react'
import { Field, reduxForm } from 'redux-form'

import { required, email, minLength10 } from './../../formHelpers/validators'
import renderField from './../../formHelpers/renderField'

function SignupForm(props) {
  const { handleSubmit } = props

  return (
    <form onSubmit={handleSubmit} >
      <h1>Signup</h1>
      <Field
        name='email'
        label='Email'
        component={renderField}
        validate={[required, email]}
        type='text' />

      <Field
        name='password'
        label='Password'
        component={renderField}
        validate={[required]}
        type='password' />

      <button type='submit'>
        Signup
      </button>
    </form>
  )
}

let signupForm = reduxForm({
  form: 'signup'
})(SignupForm)

export default signupForm