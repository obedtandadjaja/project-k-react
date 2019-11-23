import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Form from './../../components/users/form'
import { edit, get } from './../../api/users'

function UserEditPage(props) {
  const { getLoading, loading, error, edit, get, user } = props
  const [submitted, setSubmitted] = useState(false)
  const editSubmit = (values) => {
    setSubmitted(true)
    edit(values)
  }

  useEffect(() => { get(props.match.params.userID) }, [get, props.match.params.userID])

  useEffect(() => {
    if (!loading || !error) {
      submitted &&
        props.history.push(`/users/${props.match.params.userID}`)
    }
  })

  return (
    <div className='userEditPage'>
      {
        !getLoading &&
        user &&
        <Form
          initialValues={user}
          onSubmit={editSubmit}
          loading={loading}
          submitError={error}
          title='Edit user'
          submitText='Edit user' />
      }
    </div>
  )
}

const mapStateToProps = state => ({
  loading: state.user.getIn(['createLoading']),
  getLoading: state.user.getIn(['getLoading']),
  error: state.user.getIn(['createError']),
  user: state.user.getIn(['user']),
})
const mapDispatchToProps = dispatch => bindActionCreators({
  edit,
  get,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(UserEditPage)
