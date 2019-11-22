import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'

const RequiresAuth = (Component) => (props) => {
  const { isAuthenticated, ...rest } = props

  function checkAndRedirect() {
    if (!isAuthenticated) {
      window.location = '/login'
    }
  }
  checkAndRedirect()

  return (<Component {...rest} />)
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.getIn(['isAuthenticated'])
})

export default compose(connect(mapStateToProps, null), RequiresAuth)
