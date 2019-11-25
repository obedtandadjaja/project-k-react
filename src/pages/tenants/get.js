import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'

import Form from './../../components/users/form'
import { get as getProperty } from './../../api/properties'
import { get as getRoom } from './../../api/rooms'
import { get } from './../../api/tenants'

function TenantGetPage(props) {
  const { loading, get, getProperty, getRoom, property, room, tenant, currentUserID } = props
  const { propertyID, roomID, tenantID } = props.match.params

  useEffect(() => {
    getProperty(currentUserID, propertyID)
    getRoom(currentUserID, propertyID, roomID)
    get(currentUserID, propertyID, roomID, tenantID)
  }, [currentUserID, getProperty, propertyID, getRoom, roomID, get, tenantID])

  return (
    <div className='tenantGetPage'>
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
        !loading &&
        tenant &&
        <Form
          initialValues={tenant}
          loading={loading}
          title='Tenant information'
          readonly />
      }
    </div>
  )
}

const mapStateToProps = state => ({
  loading: state.tenant.getIn(['getLoading']),
  property: state.property.getIn(['property']),
  room: state.room.getIn(['room']),
  tenant: state.tenant.getIn(['tenant']),
  currentUserID: state.auth.getIn(['currentUserID']),
})
const mapDispatchToProps = dispatch => bindActionCreators({
  getProperty,
  getRoom,
  get,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TenantGetPage)
