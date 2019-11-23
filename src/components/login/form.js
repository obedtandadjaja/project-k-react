import React from 'react'
import { Field, reduxForm } from 'redux-form'

import { required, email } from './../../formHelpers/validators'
import renderField from './../../formHelpers/renderField'

function LoginForm(props) {
  const { handleSubmit, submitError, loading } = props

  return (
    <form onSubmit={handleSubmit} >
      <div className='blockCard'>
        <div className='blockBody'>
          <h1>Login</h1>
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

          <div className='errorResponse'>
            { submitError && submitError.status === 401 && 'Invalid credentials' }
          </div>

          <button type='submit' disabled={loading}>
            Login
          </button>
        </div>
      </div>
    </form>
  )
}

let loginForm = reduxForm({
  form: 'login'
})(LoginForm)

export default loginForm
