import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styled from 'styled-components'

import Form from './../../components/users/form'
import { FormStyledComponent } from './../../styledComponents/form'
import { edit, get } from './../../api/users'

const Style = styled.div`
  form {
    width: 500px;
    margin: 40px auto;
  }

  form .row{
    display: block;
  }
`

function AccountEditPage(props) {
  const { getLoading, loading, error, user, currentUserID, edit, get } = props
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
    <Style>
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
    </Style>
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
