import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { login } from './../api/login'

function LoginPage(props) {
  const loginSubmit = (event) => {
    props.login({
      email: document.getElementById('loginEmail').value,
      password: document.getElementById('loginPassword').value,
    })
  }

  console.log(props)

  useEffect(() => {
    if (props.isAuthenticated) {
      props.history.push('/')
    }
  }, [props.history, props.isAuthenticated])

  return (
    <div className='loginPage'>
      <table>
        <tbody>
          <tr>
            <td>Email:</td>
            <td><input id='loginEmail' type='text' placeholder='email' /></td>
          </tr>
          <tr>
            <td>Password:</td>
            <td><input id='loginPassword' type='password' /></td>
          </tr>
          <tr>
            <td></td>
            <td>
              <button onClick={loginSubmit} disabled={props.loading}>
                Login
              </button>
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <Link to={{ pathname: '/signup' }}>
                New? Create user
              </Link>
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
  login
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
