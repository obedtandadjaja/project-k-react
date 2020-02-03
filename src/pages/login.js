import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { useHistory, useLocation } from 'react-router'

import Form from './../components/login/form'
import { LoginStyle } from '../components/commons/loginStyle'
import { login } from './../api/login'

function LoginPage(props) {
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: '/' } }

  const { login, loading, error, currentUserID } = props
  const loginSubmit = (values) => {
    login(values)
  }

  useEffect(() => {
    if (currentUserID) {
      history.replace({ pathname: '/' })
    }
  }, [history, currentUserID, from])

  return (
    <LoginStyle>
      <Form 
      onSubmit={loginSubmit} 
      loading={loading} 
      submitError={error} 
      submitText='Login' 
      />
    </LoginStyle>
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
