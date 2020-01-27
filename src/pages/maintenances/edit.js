import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Form from '../../components/maintenances/form'
import { get, edit } from '../../api/maintenance'
import { get as getRoom } from '../../api/rooms'

import { FormStyle } from '../../components/com/formStyle'

function MaintenanceEditPage(props) {
  const { getLoading, loading, error, maintenance, edit, get, getRoom, currentUserID, room } = props
  const { maintenanceID } = props.match.params
  const [submitted, setSubmitted] = useState(false)

  const editSubmit = (values) => {
    setSubmitted(true)
    edit(currentUserID, values)
  }

  // component did mount fetch maintenance by id
  useEffect(() => {
    get(currentUserID, maintenanceID)
  }, [get, currentUserID, maintenanceID])


  // component did update
  useEffect(() => {
    if (maintenance != null) {
      getRoom(currentUserID, maintenance.propertyID, maintenance.roomID, { eager: 'Tenants' })
    }
  }, [maintenance])

  // componnet did unmount
  useEffect(() => {
    if (!loading && !error ) {
      submitted &&
      props.history.push(`/maintenance/open`)
    }
  })

  
  
  return (
    <div className='propertyCreatePage'>
    {
      !getLoading &&
      maintenance &&
      room && 
      <FormStyle >
        <Form
          edit={true}
          initialValues={maintenance}
          roomName={room.name}
          onSubmit={editSubmit}
          loading={loading}
          submitError={error}
          title='Edit  Maintenance Request'
          buttonText='Edit' />
      </FormStyle>
    }
    </div>
  )
}

const mapStateToProps = state => ({
  loading: state.maintenance.getIn(['createLoading']),
  getLoading: state.maintenance.getIn(['getLoading']),
  error: state.maintenance.getIn(['createError']),
  maintenance: state.maintenance.getIn(['maintenance']),
  currentUserID: state.auth.getIn(['currentUserID']),
  room: state.room.getIn(['room'])

})
const mapDispatchToProps = dispatch => bindActionCreators({
  edit,
  get,
  getRoom,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MaintenanceEditPage)
