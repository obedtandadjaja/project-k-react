import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { signup } from './../api/signup'
import Form from './../components/signup/form'

function SignupPage(props) {
  const { signup, loading, error, currentUserID } = props
  const signupSubmit = (values) => {
    signup(values)
  }

  useEffect(() => {
    if (currentUserID) {
      props.history.push({ pathname: '/' })
    }
  }, [props.history, currentUserID])

  return (
    <div className='signupPage page'>
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
