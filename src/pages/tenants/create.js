import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import Form from './../../components/tenants/form'
import { FormStyledComponent } from './../../styledComponents/form'
import { get as getProperty } from './../../api/properties'
import { get as getRoom } from './../../api/rooms'
import { create } from './../../api/tenants'

const Style = styled.div`
  form{
    width: 500px;
    margin: auto;
  }
  
  form .button{
    margin-bottom: 4em;
  }
`

function TenantCreatePage(props) {
  const { loading, error, tenant, create, getProperty, getRoom, property, room, currentUserID } = props
  const { propertyID, roomID } = props.match.params
  const [submitted, setSubmitted] = useState(false)

  const createSubmit = (values) => {
    setSubmitted(true)
    create(currentUserID, propertyID, roomID, values)
  }

  useEffect(() => {
    getProperty(currentUserID, propertyID)
    getRoom(currentUserID, propertyID, roomID)
  }, [currentUserID, getProperty, propertyID, getRoom, roomID])

  useEffect(() => {
    if (!loading && !error && submitted && tenant) {
      props.history.push(`/properties/${propertyID}/rooms/${roomID}/tenants/${tenant.id}`)
    }
  }, [props.history, loading, error, submitted, propertyID, roomID, tenant])

  return (
    <Style>
      <div className='tenantCreatePage'>
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
        <FormStyledComponent>
          <Form
            onSubmit={createSubmit}
            loading={loading}
            submitError={error}
            title='Create tenant'
            submitText='Create tenant' />
        </FormStyledComponent>
      </div>
    </Style>
  )
}

const mapStateToProps = state => ({
  loading: state.tenant.getIn(['createLoading']),
  error: state.tenant.getIn(['createError']),
  property: state.property.getIn(['property']),
  room: state.room.getIn(['room']),
  tenant: state.tenant.getIn(['tenant']),
  currentUserID: state.auth.getIn(['currentUserID']),
})
const mapDispatchToProps = dispatch => bindActionCreators({
  create,
  getProperty,
  getRoom,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TenantCreatePage)
