import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Form from './../../components/users/form'
import { get } from './../../api/users'

function UserGetPage(props) {
  const { loading, error, user, get } = props

  useEffect(() => {
    get(props.match.params.userID)
  }, [])

  return (
    <div className='userGetPage'>
      <Form
        initialValues={user}
        loading={loading}
        submitError={error}
        title='User information'
        readonly />
    </div>
  )
}

const mapStateToProps = state => ({
  loading: state.user.getIn(['getLoading']),
  error: state.user.getIn(['getError']),
  user: state.user.getIn(['user']),
})
const mapDispatchToProps = dispatch => bindActionCreators({
  get
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(UserGetPage)
