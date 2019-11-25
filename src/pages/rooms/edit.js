import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Form from './../../components/rooms/form'
import { get as getProperty } from './../../api/properties'
import { edit, get } from './../../api/rooms'

function RoomEditPage(props) {
  const { getLoading, loading, error, property, room, edit, getProperty, get, currentUserID } = props
  const [submitted, setSubmitted] = useState(false)
  const { propertyID, roomID } = props.match.params

  const editSubmit = (values) => {
    setSubmitted(true)
    edit(currentUserID, propertyID, values)
  }

  useEffect(() => {
    getProperty(currentUserID, propertyID)
    get(currentUserID, propertyID, roomID)
  }, [getProperty, get, currentUserID, propertyID, roomID])

  useEffect(() => {
    if (!loading && !error) {
      submitted &&
        props.history.push(`/properties/${propertyID}`)
    }
  })

  return (
    <div className='roomEditPage'>
      {
        property &&
          <div className='card'>
          <h4>{ property.name }</h4>
          <p>Type: { property.type }</p>
          <p>Address: { property.address }</p>
          </div>
      }

      {
        !getLoading &&
        room &&
        <Form
          initialValues={room}
          onSubmit={editSubmit}
          loading={loading}
          submitError={error}
          title='Edit room'
          buttonText='Edit room' />
      }
    </div>
  )
}

const mapStateToProps = state => ({
  loading: state.room.getIn(['editLoading']),
  getLoading: state.room.getIn(['getLoading']),
  error: state.room.getIn(['editError']),
  room: state.room.getIn(['room']),
  property: state.property.getIn(['property']),
  currentUserID: state.auth.getIn(['currentUserID']),
})
const mapDispatchToProps = dispatch => bindActionCreators({
  edit,
  get,
  getProperty,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(RoomEditPage)
