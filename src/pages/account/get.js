import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import { Button, Box } from '@material-ui/core'

import Form from './../../components/users/form'
import FormStyledComponent from './../../styledComponents/form'
import PageContent from './../../styledComponents/pageContent'
import { get } from './../../api/users'

function AccountGetPage(props) {
  const { loading, error, user, currentUserID, get } = props

  useEffect(() => {
    get(currentUserID)
  }, [get, currentUserID])

  return (
    <PageContent>
      <div className='userGetPage'>
        <Box mb={2}>
          <Button
            variant='contained'
            component={Link}
            color='primary'
            to={{ pathname: '/account/edit' }}>
            Edit account
          </Button>
        </Box>

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
    </PageContent>
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
