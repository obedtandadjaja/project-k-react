import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Form from './../../components/rooms/batch/form'
import FormStyledComponent from './../../styledComponents/form'
import PageContent from './../../styledComponents/pageContent'
import { createBatch } from './../../api/rooms'

function RoomCreateBatchPage(props) {
  const { loading, error, rooms, createBatch, currentUserID } = props
  const [submitted, setSubmitted] = useState(false)
  const { propertyID } = props.match.params

  const createBatchSubmit = (values) => {
    setSubmitted(true)
    createBatch(currentUserID, propertyID, values)
  }

  useEffect(() => {
    console.log(loading, error, submitted, rooms)
    if (!loading && !error && submitted && rooms) {
      props.history.push(`/properties/${propertyID}`)
    }
  }, [props.history, loading, error, submitted, rooms, propertyID])

  return (
    <PageContent>
      <FormStyledComponent>
        <Form
          onSubmit={createBatchSubmit}
          loading={loading}
          submitError={error}
          title='Add multiple rooms'
          buttonText='Create rooms' />
      </FormStyledComponent>
    </PageContent>
  )
}

const mapStateToProps = state => ({
  loading: state.room.getIn(['createBatchLoading']),
  error: state.room.getIn(['createBatchError']),
  rooms: state.room.getIn(['rooms']),
  currentUserID: state.auth.getIn(['currentUserID']),
})
const mapDispatchToProps = dispatch => bindActionCreators({
  createBatch,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(RoomCreateBatchPage)
