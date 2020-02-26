import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Form from './../../components/maintenance_requests/form'
import FormStyledComponent from './../../styledComponents/form'
import PageContent from './../../styledComponents/pageContent'
import { get } from './../../api/maintenanceRequests'
import { all } from './../../api/properties'

function MaintenanceRequestsDetailsPage(props) {
  const { getLoading, maintenanceRequest, currentUserID, properties, get, all } = props
  const { maintenanceRequestID } = props.match.params

  useEffect(() => {
    get(currentUserID, maintenanceRequestID)
    all(currentUserID, { eager: 'Rooms' })
  }, [currentUserID, maintenanceRequestID, get, all])

  return (
    <PageContent>
      {
        !getLoading &&
        properties &&
        <FormStyledComponent>
          <Form
            initialValues={maintenanceRequest}
            title='Maintenance Request'
            buttonText='Edit'
            readonly />
        </FormStyledComponent>
      }
    </PageContent>
  )
}

const mapStateToProps = state => ({
  currentUserID: state.auth.getIn(['currentUserID']),
  getLoading: state.maintenance_request.getIn(['getLoading']),
  maintenanceRequest: state.maintenance_request.getIn(['maintenanceRequest']),
  properties: state.property.getIn(['properties'])
})
const mapDispatchToProps = dispatch => bindActionCreators({
  get,
  all,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MaintenanceRequestsDetailsPage)
