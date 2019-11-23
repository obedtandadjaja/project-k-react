import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { login } from './../api/login'
import Form from './../components/login/form'

function LoginPage(props) {
  const { login, loading, error, currentUserID } = props
  const loginSubmit = (values) => {
    login(values)
  }

  useEffect(() => {
    if (currentUserID) {
      props.history.push('/')
    }
  }, [props.history, currentUserID])

  return (
    <div className='loginPage page'>
      <Form onSubmit={loginSubmit} loading={loading} submitError={error} />
    </div>
  )
}

const mapStateToProps = state => ({
  loading: state.auth.getIn(['loading']),
  currentUserID: state.auth.getIn(['currentUserID']),
  error: state.auth.getIn(['error']),
})

const mapDispatchToProps = dispatch => bindActionCreators({
  login: login
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
