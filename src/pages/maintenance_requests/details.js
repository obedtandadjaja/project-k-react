import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Form from '../../components/maintenances/form'
import { FormStyle } from '../../components/commons/formStyle'
import { get, edit } from '../../api/maintenances'
import { get as getRoom } from '../../api/rooms'
import { get as getProperty, all as fetchAllProperties } from '../../api/properties'

function MaintenanceRequestsDetailsPage(props) {
  const { getLoading, loading, error, maintenance, edit, get, currentUserID, properties, fetchAllProperties } = props
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
        <FormStyle >
          <Form
            edit={true}
            readonly
            initialValues={maintenance}
            properties={properties}
            onSubmit={editSubmit}
            loading={loading}
            submitError={error}
            title='Details'
            buttonText='Ok' />
        </FormStyle>
      }
    </div>
  )
}

const mapStateToProps = state => ({
  loading: state.maintenance.getIn(['createLoading']),
  getLoading: state.maintenance.getIn(['getLoading']),
  error: state.maintenance.getIn(['createError']),
  currentUserID: state.auth.getIn(['currentUserID']),
  maintenance: state.maintenance.getIn(['maintenance']),
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
