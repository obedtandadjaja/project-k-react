import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import { Button, Box } from '@material-ui/core'

import Form from './../../components/tenants/form'
import FormStyledComponent from './../../styledComponents/form'
import PageContent from './../../styledComponents/pageContent'
import { get } from './../../api/tenants'

function TenantGetPage(props) {
  const { loading, get, tenant, currentUserID } = props
  const { propertyID, roomID, tenantID } = props.match.params

  useEffect(() => {
    get(currentUserID, propertyID, roomID, tenantID)
  }, [currentUserID, propertyID, roomID, get, tenantID])

  return (
    <PageContent>
      <Box mb={2}>
        <Button 
          variant='contained'
          component={Link}
          color='primary'
          to={{ pathname: `/properties/${propertyID}/rooms/${roomID}/tenants/${tenantID}/edit` }}>
          Edit tenant
        </Button>
      </Box>
      {
        !loading &&
        tenant &&
        <FormStyledComponent>
          <Form
            initialValues={tenant}
            loading={loading}
            title='Tenant information'
            readonly />
        </FormStyledComponent>
      }
    </PageContent>
  )
  /*
      {
        !loading &&
        tenant &&
        <div className='card'>
          <h4>Payments</h4>
          <table>
            <theader>
              <tr>
                <th>Payment Date</th>
                <th>Amount</th>
                <th>Description</th>
              </tr>
            </theader>
            <tbody>
              {
                tenant.payments &&
                tenant.payments.map(payment => (
                  <tr>
                    <td>{ payment.created_at }</td>
                    <td>{ payment.amount }</td>
                    <td>{ payment.description }</td>
                  </tr>
                ))
              }
              {
                (!tenant.payments || tenant.payments.length === 0) &&
                <tr>
                  <td colSpan='3'>No payments</td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      }
   */
  /* <PaymentForm
      initialValues={tenant.payments}
      loading={loading}
      title='Tenant payments'
      buttonText='Register payment'
      readonly /> */
}

const mapStateToProps = state => ({
  loading: state.tenant.getIn(['getLoading']),
  tenant: state.tenant.getIn(['tenant']),
  currentUserID: state.auth.getIn(['currentUserID']),
})
const mapDispatchToProps = dispatch => bindActionCreators({
  get,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TenantGetPage)
