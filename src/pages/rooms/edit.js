import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import Form from './../../components/rooms/form'
import { FormStyledComponent } from './../../styledComponents/form'
import { get as getProperty } from './../../api/properties'
import { edit, get } from './../../api/rooms'

const Style = styled.div`
  .roomEditPage{
    width: 500px;
    margin: auto;
  }
`

function RoomEditPage(props) {
  const { loading, getLoading, error, property, room, edit, getProperty, get, currentUserID } = props
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
    if (!loading && !error && submitted && room) {
      props.history.push(`/properties/${propertyID}/rooms/${roomID}`)
    }
  })

  return (
    <Style>
      <div className='roomEditPage'>
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
          !getLoading &&
          room &&
          <FormStyledComponent>
            <Form
              initialValues={room}
              onSubmit={editSubmit}
              loading={loading}
              submitError={error}
              title='Edit room'
              buttonText='Edit room' />
          </FormStyledComponent>
        }
      </div>
    </Style>
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
