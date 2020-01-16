import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'

import Form from './../../components/rooms/form'
import { get } from './../../api/properties'
import { create } from './../../api/rooms'

import { FormStyle } from './../../style/styleHelpers'

function RoomCreatePage(props) {
  const { loading, error, property, room, get, create, currentUserID } = props
  const [submitted, setSubmitted] = useState(false)
  const { propertyID } = props.match.params

  const createSubmit = (values) => {
    setSubmitted(true)
    create(currentUserID, propertyID, values)
  }

  useEffect(() => {
    get(currentUserID, propertyID)
  }, [get, currentUserID, propertyID])

  useEffect(() => {
    if (!loading && !error && submitted && room) {
      props.history.push(`/properties/${property.id}/rooms/${room.id}`)
    }
  }, [props.history, loading, error, submitted, property, room])

  return (
    <div className='propertyCreatePage'>
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
      <FormStyle>
        <Form
          onSubmit={createSubmit}
          loading={loading}
          submitError={error}
          title='Add a room'
          buttonText='Create room' 
          />
      </FormStyle>
    </div>
  )
}

const mapStateToProps = state => ({
  loading: state.room.getIn(['createLoading']),
  error: state.room.getIn(['createError']),
  property: state.property.getIn(['property']),
  room: state.room.getIn(['room']),
  currentUserID: state.auth.getIn(['currentUserID']),
})
const mapDispatchToProps = dispatch => bindActionCreators({
  create,
  get,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(RoomCreatePage)
