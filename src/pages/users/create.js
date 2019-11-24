import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Form from './../../components/users/form'
import { get as getProperty } from './../../api/properties'
import { get as getRoom } from './../../api/rooms'
import { create } from './../../api/users'

function UserCreatePage(props) {
  const { loading, error, user, create, getProperty, getRoom, property, room, currentUserID } = props
  const { propertyID, roomID } = props.match.params

  const createSubmit = (values) => {
    create(currentUserID, propertyID, roomID, values)
  }

  useEffect(() => {
    getProperty(currentUserID, propertyID)
    getRoom(currentUserID, propertyID, roomID)
  }, [currentUserID, getProperty, propertyID, getRoom, roomID])

  useEffect(() => {
    if (!loading && !error) {
      user &&
        props.history.push(`/users/${user.id}`)
    }
  }, [props.history, loading, error, user])

  return (
    <div className='userCreatePage'>
      {
        property &&
        <div className='card'>
          <h4>{ property.name }</h4>
          <p>Type: { property.type }</p>
          <p>Address: { property.address }</p>
        </div>
      }

      {
        room &&
        <div className='card'>
          <h4>{ room.name }</h4>
          <p>Payment schedule: { room.paymentSchedule }</p>
          <p>Payment amount: { room.paymentAmount }</p>
        </div>
      }

      <Form
        onSubmit={createSubmit}
        loading={loading}
        submitError={error}
        title='Create tenant'
        submitText='Create tenant' />
    </div>
  )
}

const mapStateToProps = state => ({
  loading: state.user.getIn(['createLoading']),
  error: state.user.getIn(['createError']),
  property: state.property.getIn(['property']),
  room: state.room.getIn(['room']),
  user: state.user.getIn(['user']),
  currentUserID: state.auth.getIn(['currentUserID']),
})
const mapDispatchToProps = dispatch => bindActionCreators({
  create,
  getProperty,
  getRoom,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(UserCreatePage)
