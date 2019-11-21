import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Form from './../../components/users/form'
import { create } from './../../api/users'

function UserCreatePage(props) {
  const { loading, error, user, create } = props

  const createSubmit = (values) => {
    create(values)
  }

  useEffect(() => {
    if (!loading || !error) {
      user &&
        props.history.push(`/users/${user.id}`)
    }
  }, [props.history, loading, error, user])

  return (
    <div className='userCreatePage'>
      <Form onSubmit={createSubmit} submitting={loading} error={error} />
    </div>
  )
}

const mapStateToProps = state => ({
  loading: state.user.getIn(['createLoading']),
  error: state.user.getIn(['createError']),
  user: state.user.getIn(['user']),
})
const mapDispatchToProps = dispatch => bindActionCreators({
  create
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(UserCreatePage)
