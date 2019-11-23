import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'

const RequiresAuth = (Component) => (props) => {
  const { currentUserID, ...rest } = props

  function checkAndRedirect() {
    if (!currentUserID) {
      window.location = '/login'
    }
  }
  checkAndRedirect()

  return (<Component {...rest} />)
}

const mapStateToProps = state => ({
  currentUserID: state.auth.getIn(['currentUserID'])
})

export default compose(connect(mapStateToProps, null), RequiresAuth)
