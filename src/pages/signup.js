import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { signup } from './../api/signup'
import Form from './../components/signup/form'

function SignupPage(props) {
  const { signup, loading, error } = props
  const [submitted, setSubmitted] = useState(false)

  const signupSubmit = (values) => {
    setSubmitted(true)
    signup(values)
  }

  useEffect(() => {
    if (!loading && !error) {
      submitted &&
        props.history.push('/login')
    }
  }, [props.history, loading, error, submitted])

  return (
    <div className='signupPage'>
      <Form onSubmit={signupSubmit} loading={loading} error={error} />
    </div>
  )
}

const mapStateToProps = state => ({
  loading: state.auth.getIn(['loading']),
  error: state.auth.getIn(['error']),
})

const mapDispatchToProps = dispatch => bindActionCreators({
  signup: signup
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage)
