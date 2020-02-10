import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Form from '../../components/maintenance_requests/form'
import { FormStyledComponent } from '../../styledComponents/form'
import { get, edit } from '../../api/maintenanceRequests'
import { get as getRoom } from '../../api/rooms'
import { get as getProperty, all as fetchAllProperties } from '../../api/properties'

function MaintenanceRequestsDetailsPage(props) {
  const { getLoading, loading, error, maintenanceRequests, edit, get, currentUserID, properties, fetchAllProperties } = props
  const { maintenanceRequestID } = props.match.params
  const [submitted, setSubmitted] = useState(false)

  const editSubmit = (values) => {
    setSubmitted(true)
    edit(currentUserID, values)
  }

  useEffect(() => {
    get(currentUserID, maintenanceRequestID)
    fetchAllProperties(currentUserID)
  }, [currentUserID, maintenanceRequestID, get, fetchAllProperties])

  useEffect(() => {
    if (!loading && !error) {
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
            readonly
            initialValues={maintenanceRequests}
            properties={properties}
            onSubmit={editSubmit}
            loading={loading}
            submitError={error}
            title='Details'
            buttonText='Ok' />
        </FormStyledComponent>
      }
    </div>
  )
}

const mapStateToProps = state => ({
  loading: state.maintenance.getIn(['createLoading']),
  getLoading: state.maintenance.getIn(['getLoading']),
  error: state.maintenance.getIn(['createError']),
  currentUserID: state.auth.getIn(['currentUserID']),
  maintenanceRequests: state.maintenance_request.getIn(['maintenanceRequests']),
  properties: state.property.getIn(['properties']),
})
const mapDispatchToProps = dispatch => bindActionCreators({
  edit,
  get,
  getRoom,
  getProperty,
  fetchAllProperties,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MaintenanceRequestsDetailsPage)
