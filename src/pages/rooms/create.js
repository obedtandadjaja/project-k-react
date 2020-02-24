import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Form from './../../components/rooms/form'
import FormStyledComponent from './../../styledComponents/form'
import PageContent from './../../styledComponents/pageContent'
import { create } from './../../api/rooms'

function RoomCreatePage(props) {
  const { loading, error, room, create, currentUserID } = props
  const [submitted, setSubmitted] = useState(false)
  const { propertyID } = props.match.params

  const createSubmit = (values) => {
    setSubmitted(true)
    create(currentUserID, propertyID, values)
  }

  useEffect(() => {
    if (!loading && !error && submitted && room) {
      props.history.push(`/properties/${room.propertyId}/rooms/${room.id}`)
    }
  }, [props.history, loading, error, submitted, room])

  return (
    <PageContent>
      <FormStyledComponent>
        <Form
          onSubmit={createSubmit}
          loading={loading}
          submitError={error}
          title='Add a room'
          buttonText='Create room' />
      </FormStyledComponent>
    </PageContent>
  )
}

const mapStateToProps = state => ({
  loading: state.room.getIn(['createLoading']),
  error: state.room.getIn(['createError']),
  room: state.room.getIn(['room']),
  currentUserID: state.auth.getIn(['currentUserID']),
})
const mapDispatchToProps = dispatch => bindActionCreators({
  create,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(RoomCreatePage)
