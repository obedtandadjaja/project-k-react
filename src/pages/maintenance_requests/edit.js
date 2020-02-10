import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Form from '../../components/maintenance_requests/form'
import { FormStyledComponent } from '../../styledComponents/form'
import { get, edit } from '../../api/maintenanceRequests'
import { get as getRoom } from '../../api/rooms'
import { get as getProperty, all as fetchAllProperties } from '../../api/properties' 

function MaintenanceRequestsEditPage(props) {
  const { getLoading, loading, error, maintenanceRequest, edit, get, currentUserID, properties, fetchAllProperties } = props
  const { maintenanceID } = props.match.params
  const [submitted, setSubmitted] = useState(false)

  const editSubmit = (values) => {
    setSubmitted(true)
    edit(currentUserID, values)
  }

  useEffect(() => {
    get(currentUserID, maintenanceID)
    fetchAllProperties(currentUserID)
  }, [get, currentUserID, maintenanceID])

  useEffect(() => {
    if (!loading && !error ) {
      submitted &&
      props.history.push(`/maintenance_requests/open`)
    }
  })

  return (
    <div className='propertyCreatePage'>
    {
      !getLoading &&
      properties &&
        <FormStyledComponent>
        <Form
          edit={true}
          initialValues={maintenanceRequest}
          properties={properties}
          onSubmit={editSubmit}
          loading={loading}
          submitError={error}
          title='Edit  Maintenance Request'
          buttonText='Edit' />
        </FormStyledComponent>
    }
    </div>
  )
}

const mapStateToProps = state => ({
  loading: state.maintenance_request.getIn(['createLoading']),
  getLoading: state.maintenance_request.getIn(['getLoading']),
  error: state.maintenance_request.getIn(['createError']),
  maintenanceRequest: state.maintenance_request.getIn(['maintenanceRequest']),
  currentUserID: state.auth.getIn(['currentUserID']),
  properties: state.property.getIn(['properties']),
})
const mapDispatchToProps = dispatch => bindActionCreators({
  edit,
  get,
  getRoom,
  getProperty,
  fetchAllProperties,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MaintenanceRequestsEditPage)
