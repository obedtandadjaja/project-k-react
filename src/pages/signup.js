import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { useHistory, useLocation } from 'react-router'

import { signup } from './../api/signup'
import Form from './../components/signup/form'

function SignupPage(props) {
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: '/' } }

  const { signup, loading, error, currentUserID } = props
  const signupSubmit = (values) => {
    signup(values)
  }

  useEffect(() => {
    if (currentUserID) {
      history.replace({ pathname: '/' })
    }
  }, [history, currentUserID, from])

  return (
    <div className='signupPage'>
      <Form onSubmit={signupSubmit} loading={loading} error={error} />
    </div>
  )
}

const mapStateToProps = state => ({
  loading: state.auth.getIn(['loading']),
  currentUserID: state.auth.getIn(['currentUserID']),
  error: state.auth.getIn(['error']),
})

const mapDispatchToProps = dispatch => bindActionCreators({
  signup: signup
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage)
