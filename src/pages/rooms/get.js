import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Form from './../../components/rooms/form'
import { get } from './../../api/rooms'

function RoomGetPage(props) {
  const { loading, error, room, get, currentUserID } = props

  useEffect(() => {
    get(currentUserID, props.match.params.propertyID, props.match.params.roomID, true)
  }, [get, props.match.params.roomID, currentUserID])

  return (
    <div className='roomGetPage'>
      {
        !loading &&
        room &&
        <Form
          initialValues={room}
          loading={loading}
          error={error}
          title='Room'
          readonly={true} />
      }
    </div>
  )
}

const mapStateToProps = state => ({
  loading: state.room.getIn(['getLoading']),
  error: state.room.getIn(['getError']),
  room: state.room.getIn(['room']),
  currentUserID: state.auth.getIn(['currentUserID']),
})
const mapDispatchToProps = dispatch => bindActionCreators({
  get,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(RoomGetPage)
