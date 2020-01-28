import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Form from '../../components/maintenances/form'
import { get, edit } from '../../api/maintenance'
import { get as getRoom } from '../../api/rooms'
import { get as getProperty, all as fetchAllProperties } from '../../api/properties' 


import { FormStyle } from '../../components/com/formStyle'

function MaintenanceEditPage(props) {
  const { getLoading, loading, error, maintenance, edit, get, currentUserID, properties, fetchAllProperties } = props
  const { maintenanceID } = props.match.params
  const [submitted, setSubmitted] = useState(false)

  const editSubmit = (values) => {
    setSubmitted(true)
    edit(currentUserID, values)
  }

  // component did mount fetch maintenance by id
  useEffect(() => {
    get(currentUserID, maintenanceID)
    fetchAllProperties(currentUserID)
  }, [get, currentUserID, maintenanceID])

  // componnet did unmount
  useEffect(() => {
    if (!loading && !error ) {
      submitted &&
      props.history.push(`/maintenance/open`)
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
          initialValues={maintenance}
          properties={properties}
          onSubmit={editSubmit}
          loading={loading}
          submitError={error}
          title='Edit  Maintenance Request'
          buttonText='Edit' />
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

export default connect(mapStateToProps, mapDispatchToProps)(MaintenanceEditPage)
