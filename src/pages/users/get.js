import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Form from './../../components/users/form'
import { get } from './../../api/users'

function UserGetPage(props) {
  const { loading, error, user, get } = props

  const redirectEditPage = () => {
    props.history.push(`/users/${user.id}/edit`)
  }

  useEffect(() => {
    get(props.match.params.userID)
  }, [get, props.match.params.userID])

  return (
    <div className='userGetPage'>
      <button className='link' onClick={redirectEditPage}>
        Edit user
      </button>
      {
        user &&
        <Form
          initialValues={user}
          loading={loading}
          submitError={error}
          title='User information'
          readonly />
      }
    </div>
  )
}

const mapStateToProps = state => ({
  loading: state.user.getIn(['getLoading']),
  error: state.user.getIn(['getError']),
  user: state.user.getIn(['user']),
})
const mapDispatchToProps = dispatch => bindActionCreators({
  get,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(UserGetPage)
