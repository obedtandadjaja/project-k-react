import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

function LoginPage(props) {
  const loginSubmit = (event) => {
    // dispatch the event here
  }

  useEffect(() => {
    props.history.push('/')
  }, [props.history, props.isAuthenticated])

  return (
    <div class='loginPage'>
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
              <button onClick={loginSubmit}>
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
  isAuthenticated: state.auth.getIn(['isAuthenticated'])
})

const mapDispatchToProps = null

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
