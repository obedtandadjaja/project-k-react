import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Form from './../../components/rooms/form'
import FormStyledComponent from './../../styledComponents/form'
import PageContent from './../../styledComponents/pageContent'
import { edit, get } from './../../api/rooms'

function RoomEditPage(props) {
  const { loading, getLoading, error, room, edit, get, currentUserID } = props
  const [submitted, setSubmitted] = useState(false)
  const { propertyID, roomID } = props.match.params

  const editSubmit = (values) => {
    setSubmitted(true)
    edit(currentUserID, propertyID, values)
  }

  useEffect(() => {
    get(currentUserID, propertyID, roomID)
  }, [get, currentUserID, propertyID, roomID])

  useEffect(() => {
    if (!loading && !error && submitted && room) {
      props.history.push(`/properties/${propertyID}/rooms/${roomID}`)
    }
  })

  return (
    <PageContent>
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
    </PageContent>
  )
}

const mapStateToProps = state => ({
  loading: state.room.getIn(['editLoading']),
  getLoading: state.room.getIn(['getLoading']),
  error: state.room.getIn(['editError']),
  room: state.room.getIn(['room']),
  currentUserID: state.auth.getIn(['currentUserID']),
})
const mapDispatchToProps = dispatch => bindActionCreators({
  edit,
  get,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(RoomEditPage)
