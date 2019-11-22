import React, { useEffect } from 'react'
import { connect } from 'react-redux'

function RequiresAuth(Component) {
  function AuthComponent(props) {
    const { isAuthenticated } = props

    useEffect(() => {
      function checkAndRedirect() {
        if (!isAuthenticated) {
          window.location = '/login'
        }
      }
      checkAndRedirect()
    }, [isAuthenticated])

    return (
      <>
        { isAuthenticated && props.children }
      </>
    )
  }

  const mapStateToProps = state => ({
    isAuthenticated: state.auth.getIn(['isAuthenticated'])
  })

  return connect(mapStateToProps, null)(AuthComponent)
}

export default RequiresAuth
