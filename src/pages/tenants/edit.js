import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'

import Form from './../../components/users/form'
import { get as getProperty } from './../../api/properties'
import { get as getRoom } from './../../api/rooms'
import { edit, get } from './../../api/tenants'

function TenantEditPage(props) {
  const { loading, error, edit, getProperty, getRoom, get, property, room, tenant, currentUserID } = props
  const { propertyID, roomID, tenantID } = props.match.params
  const [submitted, setSubmitted] = useState(false)

  const editSubmit = (values) => {
    setSubmitted(true)
    edit(currentUserID, propertyID, roomID, values)
  }

  useEffect(() => {
    getProperty(currentUserID, propertyID)
    getRoom(currentUserID, propertyID, roomID)
    get(currentUserID, propertyID, roomID, tenantID)
  }, [currentUserID, getProperty, propertyID, getRoom, roomID, get, tenantID])

  useEffect(() => {
    if (!loading && !error && submitted && tenant) {
      props.history.push(`/properties/${propertyID}/rooms/${roomID}/tenants/${tenant.id}`)
    }
  }, [props.history, loading, error, submitted, propertyID, roomID, tenant])

  return (
    <div className='tenantEditPage'>
      {
        property &&
        <Link to={{ pathname: `/properties/${propertyID}` }}>
          <div className='card'>
            <h4>{ property.name }</h4>
            <p>Type: { property.type }</p>
            <p>Address: { property.address }</p>
          </div>
        </Link>
      }

      {
        room &&
        <Link to={{ pathname: `/properties/${propertyID}/rooms/${roomID}` }}>
          <div className='card'>
            <h4>{ room.name }</h4>
            <p>Payment schedule: { room.paymentSchedule }</p>
            <p>Payment amount: { room.paymentAmount }</p>
          </div>
        </Link>
      }

      {
        tenant &&
        <Form
          initialValues={tenant}
          onSubmit={editSubmit}
          loading={loading}
          submitError={error}
          title='Edit tenant'
          submitText='Edit tenant' />
      }
    </div>
  )
}

const mapStateToProps = state => ({
  loading: state.tenant.getIn(['editLoading']),
  error: state.tenant.getIn(['editError']),
  property: state.property.getIn(['property']),
  room: state.room.getIn(['room']),
  tenant: state.tenant.getIn(['tenant']),
  currentUserID: state.auth.getIn(['currentUserID']),
})
const mapDispatchToProps = dispatch => bindActionCreators({
  edit,
  getProperty,
  getRoom,
  get,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TenantEditPage)
