import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Form from '../../components/maintenance_requests/form'
import { FormStyledComponent } from '../../styledComponents/form'
import { create } from '../../api/maintenanceRequests'
import { all as fetchAllProperties } from './../../api/properties'

function MaintenanceRequestsCreatePage(props) {
  const { loading, error, create, currentUserID, fetchAllProperties, properties } = props
  const [submitted, setSubmitted] = useState(false)

  const createSubmit = (values) => {
    setSubmitted(true)
    create(currentUserID, values)
    
  }

  useEffect(() => {
    fetchAllProperties(currentUserID)
  }, [currentUserID,])

  useEffect(() => {
    if (!loading && !error && submitted) {
      props.history.push(`/maintenance_requests/open`)
    }
  }, [props.history, loading, error, submitted])

  return (
    <div className='propertyCreatePage'>
      {
        properties &&
        <FormStyledComponent>
          <Form
            properties={properties}
            onSubmit={createSubmit}
            loading={loading}
            submitError={error}
            title='Create  Maintenance Request'
            buttonText='Create' />
        </FormStyledComponent>
      }
    </div>
  )
}

const mapStateToProps = state => ({
  loading: state.maintenance_request.getIn(['createLoading']),
  error: state.maintenance_request.getIn(['createError']),
  currentUserID: state.auth.getIn(['currentUserID']),
  properties: state.property.getIn(['properties']),
})
const mapDispatchToProps = dispatch => bindActionCreators({
  create,
  fetchAllProperties,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MaintenanceRequestsCreatePage)
