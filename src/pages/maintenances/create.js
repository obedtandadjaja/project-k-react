import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Form from '../../components/maintenances/form'
import { create } from '../../api/maintenance'

import { FormStyle } from '../../components/com/formStyle'

function MaintenanceCreatePage(props) {
  const { loading, error, maintenance, create, currentUserID } = props
  const [submitted, setSubmitted] = useState(false)

  const createSubmit = (values) => {
    setSubmitted(true)
    create(currentUserID, values)
    
  }

  useEffect(() => {
    if (!loading && !error && submitted && maintenance) {
      props.history.push(`/maintenance/open`)
    }
  }, [props.history, loading, error, submitted, maintenance])

  return (
    <div className='propertyCreatePage'>
      <FormStyle >
        <Form
          onSubmit={createSubmit}
          loading={loading}
          submitError={error}
          title='Create  Maintenance Request'
          buttonText='Create Request' />
      </FormStyle>
    </div>
  )
}

const mapStateToProps = state => ({
  loading: state.maintenance.getIn(['createLoading']),
  error: state.maintenance.getIn(['createError']),
  maintenance: state.maintenance.getIn(['maintenance']),
  currentUserID: state.auth.getIn(['currentUserID']),
})
const mapDispatchToProps = dispatch => bindActionCreators({
  create
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MaintenanceCreatePage)
