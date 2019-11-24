import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Form from './../../components/rooms/form'
import { get } from './../../api/properties'
import { create } from './../../api/rooms'

function RoomCreatePage(props) {
  const { loading, error, property, room, get, create, currentUserID } = props

  const createSubmit = (values) => {
    create(currentUserID, values)
  }

  useEffect(() => {
    get(currentUserID, props.match.params.propertyID)
  }, [get, currentUserID, props.match.params.propertyID])

  useEffect(() => {
    if (!loading || !error) {
      room &&
        props.history.push(`/properties/${property.id}`)
    }
  }, [props.history, loading, error, property, room])

  return (
    <div className='propertyCreatePage'>
      <div className='card'>
        <h4>{ property.name }</h4>
        <p>Type: { property.type }</p>
        <p>Address: { property.address }</p>
        <p>Number of rooms: { property.rooms.length }</p>
      </div>

      <Form
        onSubmit={createSubmit}
        loading={loading}
        submitError={error}
        title='Create property'
        buttonText='Create property' />
    </div>
  )
}

const mapStateToProps = state => ({
  loading: state.room.getIn(['createLoading']),
  error: state.room.getIn(['createError']),
  property: state.property.getIn(['property']),
  room: state.room.getIn(['property']),
  currentUserID: state.auth.getIn(['currentUserID']),
})
const mapDispatchToProps = dispatch => bindActionCreators({
  create
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(RoomCreatePage)
