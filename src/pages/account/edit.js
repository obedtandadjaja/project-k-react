import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Form from './../../components/users/form'
import { FormStyledComponent } from '../../styledComponents/form'
import { edit, get } from './../../api/users'

function AccountEditPage(props) {
  const { getLoading, loading, error, edit, get, user, currentUserID } = props
  const [submitted, setSubmitted] = useState(false)
  const editSubmit = (values) => {
    setSubmitted(true)
    edit(values)
  }

  useEffect(() => { get(currentUserID) }, [get, currentUserID])

  useEffect(() => {
    if (!loading && !error) {
      submitted &&
        props.history.push(`/users/${props.match.params.userID}`)
    }
  })

  return (
    <div className='userEditPage'>
      {
        !getLoading &&
        user &&
        <FormStyledComponent>
          <Form
            initialValues={user}
            onSubmit={editSubmit}
            loading={loading}
            submitError={error}
            title='Edit user'
            submitText='Edit user' />
        </FormStyledComponent>
      }
    </div>
  )
}

const mapStateToProps = state => ({
  loading: state.user.getIn(['createLoading']),
  getLoading: state.user.getIn(['getLoading']),
  error: state.user.getIn(['createError']),
  user: state.user.getIn(['user']),
  currentUserID: state.auth.getIn(['currentUserID']),
})
const mapDispatchToProps = dispatch => bindActionCreators({
  edit,
  get,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(AccountEditPage)
