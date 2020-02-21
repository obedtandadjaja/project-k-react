import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import { Button, Box } from '@material-ui/core'

import Form from './../../components/properties/form'
import FormStyledComponent from './../../styledComponents/form'
import PageContent from './../../styledComponents/pageContent'
import { get } from './../../api/properties'

function PropertyGetPage(props) {
  const { loading, error, property, get, currentUserID } = props
  const { propertyID } = props.match.params

  useEffect(() => {
    get(currentUserID, propertyID, { eager: 'Rooms' })
  }, [get, propertyID, currentUserID])

  return (
    <PageContent>
      <Box mb={2}>
        <Button 
          variant='contained'
          component={Link}
          color='primary'
          to={{ pathname: `/properties/${propertyID}/edit` }}>
          Edit property
        </Button>
      </Box>
      {
        !loading &&
        property &&
        <FormStyledComponent>
          <Form
            initialValues={property}
            loading={loading}
            error={error}
            title='Property'
            readonly />
        </FormStyledComponent>
      }
    </PageContent>
  )
}

const mapStateToProps = state => ({
  loading: state.property.getIn(['getLoading']),
  error: state.property.getIn(['getError']),
  property: state.property.getIn(['property']),
  currentUserID: state.auth.getIn(['currentUserID']),
})
const mapDispatchToProps = dispatch => bindActionCreators({
  get
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(PropertyGetPage)
