import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'

import Form from './../../components/rooms/form'
import { get as getProperty } from './../../api/properties'
import { get } from './../../api/rooms'

import { FormStyle } from '../../components/com/formStyle'

function RoomGetPage(props) {
  const { loading, error, property, room, getProperty, get, currentUserID } = props
  const { propertyID, roomID } = props.match.params

  useEffect(() => {
    getProperty(currentUserID, propertyID)
    get(currentUserID, propertyID, roomID, { eager: 'Tenants' })
  }, [getProperty, get, currentUserID, propertyID, roomID])


  const style = {
    display: 'flex',
    flexDirection: 'column',
  }

  return (
    <div className='roomGetPage' style={style}>
      <Link to={{ pathname: `/properties/${propertyID}/rooms/${roomID}/edit` }}>
        <button>
          Edit room
        </button>
      </Link>

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
        !loading &&
        room &&
        <FormStyle>
          <Form
            initialValues={room}
            loading={loading}
            error={error}
            title='Room'
            readonly={true} 
            />
        </FormStyle>
      }
    </div>
  )
}

const mapStateToProps = state => ({
  loading: state.room.getIn(['getLoading']),
  error: state.room.getIn(['getError']),
  room: state.room.getIn(['room']),
  property: state.property.getIn(['property']),
  currentUserID: state.auth.getIn(['currentUserID']),
})
const mapDispatchToProps = dispatch => bindActionCreators({
  get,
  getProperty,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(RoomGetPage)
