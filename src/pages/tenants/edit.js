import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Form from './../../components/tenants/form'
import FormStyledComponent from './../../styledComponents/form'
import PageContent from './../../styledComponents/pageContent'
import { edit, get } from './../../api/tenants'

function TenantEditPage(props) {
  const { loading, getLoading, error, edit, get, tenant, currentUserID } = props
  const { propertyID, roomID, tenantID } = props.match.params
  const [submitted, setSubmitted] = useState(false)

  const editSubmit = (values) => {
    console.log(values)
    setSubmitted(true)
    edit(currentUserID, propertyID, roomID, values)
  }

  useEffect(() => {
    get(currentUserID, propertyID, roomID, tenantID)
  }, [currentUserID, propertyID, roomID, get, tenantID])

  useEffect(() => {
    if (!loading && !error && submitted && tenant) {
      props.history.push(`/properties/${propertyID}/rooms/${roomID}/tenants/${tenant.id}`)
    }
  }, [props.history, loading, error, submitted, propertyID, roomID, tenant])

  return (
    <PageContent>
      {
        !getLoading &&
        tenant &&
        <FormStyledComponent>
          <Form
            initialValues={tenant}
            onSubmit={editSubmit}
            loading={loading}
            submitError={error}
            title='Edit tenant'
            submitText='Edit tenant' />
        </FormStyledComponent>
      }
    </PageContent>
  )
}

const mapStateToProps = state => ({
  loading: state.tenant.getIn(['editLoading']),
  getLoading: state.tenant.getIn(['getLoading']),
  error: state.tenant.getIn(['editError']),
  tenant: state.tenant.getIn(['tenant']),
  currentUserID: state.auth.getIn(['currentUserID']),
})
const mapDispatchToProps = dispatch => bindActionCreators({
  edit,
  get,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TenantEditPage)
