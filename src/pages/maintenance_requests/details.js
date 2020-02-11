import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Form from '../../components/maintenance_requests/form'
import { FormStyledComponent } from '../../styledComponents/form'
import { get } from '../../api/maintenanceRequests'
import { all } from '../../api/properties'

function MaintenanceRequestsDetailsPage(props) {
  const { getLoading, loading, error, maintenanceRequests, currentUserID, properties, get, all } = props
  const { maintenanceRequestID } = props.match.params

  useEffect(() => {
    get(currentUserID, maintenanceRequestID)
    all(currentUserID)
  }, [currentUserID, maintenanceRequestID, get, all])

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
  currentUserID: state.auth.getIn(['currentUserID']),
  loading: state.maintenance_request.getIn(['createLoading']),
  getLoading: state.maintenance_request.getIn(['getLoading']),
  error: state.maintenance_request.getIn(['createError']),
  maintenanceRequests: state.maintenance_request.getIn(['maintenanceRequests']),
  properties: state.property.getIn(['properties'])
})
const mapDispatchToProps = dispatch => bindActionCreators({
  get,
  all,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MaintenanceRequestsDetailsPage)
