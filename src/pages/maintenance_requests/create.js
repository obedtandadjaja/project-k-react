import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Form from '../../components/maintenances/form'
import { FormStyle } from '../../components/commons/formStyle'
import { create } from '../../api/maintenances'
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
        <FormStyle >
          <Form
            properties={properties}
            onSubmit={createSubmit}
            loading={loading}
            submitError={error}
            title='Create  Maintenance Request'
            buttonText='Create' />
        </FormStyle>
      }
    </div>
  )
}

const mapStateToProps = state => ({
  loading: state.maintenance.getIn(['createLoading']),
  error: state.maintenance.getIn(['createError']),
  currentUserID: state.auth.getIn(['currentUserID']),
  properties: state.property.getIn(['properties']),
})
const mapDispatchToProps = dispatch => bindActionCreators({
  create,
  fetchAllProperties,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MaintenanceRequestsCreatePage)
