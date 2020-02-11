import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Form from '../../components/maintenance_requests/form'
import { FormStyledComponent } from '../../styledComponents/form'
import { get } from '../../api/maintenanceRequests'
import { all } from '../../api/properties'

function MaintenanceRequestsDetailsPage(props) {
  const { getLoading, loading, error, maintenanceRequest, currentUserID, properties, get, all } = props
  const { maintenanceRequestID } = props.match.params

  useEffect(() => {
    get(currentUserID, maintenanceRequestID)
    all(currentUserID, { eager: 'Rooms' })
  }, [currentUserID, maintenanceRequestID, get, all])

  return (
    <div className='propertyCreatePage'>
      {
        !getLoading &&
        properties &&
        <FormStyledComponent>
          <Form
            initialValues={maintenanceRequest}
            properties={properties}
            loading={loading}
            submitError={error}
            title='Edit Maintenance Request'
            buttonText='Edit'
            readonly
          />
        </FormStyledComponent>
      }
    </div>
  )
}

const mapStateToProps = state => ({
  currentUserID: state.auth.getIn(['currentUserID']),
  loading: state.maintenance_request.getIn(['createLoading']),
  getLoading: state.maintenance_request.getIn(['getLoading']),
  error: state.maintenance_request.getIn(['createError']),
  maintenanceRequest: state.maintenance_request.getIn(['maintenanceRequest']),
  properties: state.property.getIn(['properties'])
})
const mapDispatchToProps = dispatch => bindActionCreators({
  get,
  all,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MaintenanceRequestsDetailsPage)
