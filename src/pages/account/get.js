import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'

import Form from './../../components/users/form'
import FormStyledComponent from './../../styledComponents/form'
import { get } from './../../api/users'

function AccountGetPage(props) {
  const { loading, error, user, currentUserID, get } = props

  useEffect(() => {
    get(currentUserID)
  }, [get, currentUserID])

  return (
    <div className='userGetPage'>
      <Link to={{ pathname: '/account/edit' }}>
        <button>
          Edit account
        </button>
      </Link>

      {
        !loading &&
        user &&
        <FormStyledComponent>
          <Form
            initialValues={user}
            loading={loading}
            submitError={error}
            title='User information'
            readonly />
        </FormStyledComponent>

      }
    </div>
  )
}

const mapStateToProps = state => ({
  loading: state.user.getIn(['getLoading']),
  error: state.user.getIn(['getError']),
  user: state.user.getIn(['user']),
  currentUserID: state.auth.getIn(['currentUserID']),
})
const mapDispatchToProps = dispatch => bindActionCreators({
  get,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(AccountGetPage)
