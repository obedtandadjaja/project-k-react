import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Form from './../components/signup/form'
import FormStyledComponent from './../styledComponents/form'
import PageContent from './../styledComponents/pageContent'
import { signup } from './../api/signup'

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
    <PageContent>
      <FormStyledComponent>
        <Form
          onSubmit={signupSubmit}
          loading={loading}
          error={error}
          submitText='Register user' />
      </FormStyledComponent>
    </PageContent>
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
