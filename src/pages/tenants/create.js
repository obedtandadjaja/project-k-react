import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Form from './../../components/tenants/form'
import FormStyledComponent from './../../styledComponents/form'
import PageContent from './../../styledComponents/pageContent'
import { create } from './../../api/tenants'

function TenantCreatePage(props) {
  const { loading, error, tenant, create, currentUserID } = props
  const { propertyID, roomID } = props.match.params
  const [submitted, setSubmitted] = useState(false)

  const createSubmit = (values) => {
    setSubmitted(true)
    create(currentUserID, propertyID, roomID, values)
  }

  useEffect(() => {
    if (!loading && !error && submitted && tenant) {
      props.history.push(`/properties/${propertyID}/rooms/${roomID}/tenants/${tenant.id}`)
    }
  }, [props.history, loading, error, submitted, propertyID, roomID, tenant])

  return (
    <PageContent>
      <div className='tenantCreatePage'>
        <FormStyledComponent>
          <Form
            onSubmit={createSubmit}
            loading={loading}
            submitError={error}
            title='Create tenant'
            submitText='Create tenant' />
        </FormStyledComponent>
      </div>
    </PageContent>
  )
}

const mapStateToProps = state => ({
  loading: state.tenant.getIn(['createLoading']),
  error: state.tenant.getIn(['createError']),
  tenant: state.tenant.getIn(['tenant']),
  currentUserID: state.auth.getIn(['currentUserID']),
})
const mapDispatchToProps = dispatch => bindActionCreators({
  create,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TenantCreatePage)
