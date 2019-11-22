import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { login } from './../api/login'
import Form from './../components/login/form'

function LoginPage(props) {
  const { login, loading, error, isAuthenticated } = props

  const loginSubmit = (values) => {
    login(values)
  }

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/')
    }
  }, [props.history, isAuthenticated])

  return (
    <div class='loginPage'>
      <Form onSubmit={loginSubmit} loading={loading} error={error} />
    </div>
  )
}

const mapStateToProps = state => ({
  loading: state.auth.getIn(['loading']),
  isAuthenticated: state.auth.getIn(['isAuthenticated']),
  error: state.auth.getIn(['error']),
})

const mapDispatchToProps = dispatch => bindActionCreators({
  login: login
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
