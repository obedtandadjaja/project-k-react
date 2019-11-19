import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { signup } from './../api/signup'

function SignupPage(props) {
  const signupSubmit = (event) => {
    props.signup({
      email: document.getElementById('signupEmail').value,
      password: document.getElementById('signupPassword').value,
    })
  }

  useEffect(() => {
    if (props.isAuthenticated) {
      props.history.push('/')
    }
  }, [props.history, props.isAuthenticated])

  return (
    <div class='signupPage'>
      <table>
        <tbody>
          <tr>
            <td>Email:</td>
            <td><input id='signupEmail' type='text' placeholder='' /></td>
          </tr>
          <tr>
            <td>Password:</td>
            <td><input id='signupPassword' type='password' /></td>
          </tr>
          <tr>
            <td></td>
            <td>
              <button onClick={signupSubmit} disabled={props.loading}>
                Create User
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

const mapStateToProps = state => ({
  loading: state.auth.getIn(['loading']),
  isAuthenticated: state.auth.getIn(['isAuthenticated']),
  error: state.auth.getIn(['error']),
})

const mapDispatchToProps = dispatch => bindActionCreators({
  signup: signup
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage)
