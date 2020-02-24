import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import { Button, Box } from '@material-ui/core'

import Form from './../../components/rooms/form'
import FormStyledComponent from './../../styledComponents/form'
import PageContent from './../../styledComponents/pageContent'
import { get } from './../../api/rooms'

function RoomGetPage(props) {
  const { loading, error, room, get, currentUserID } = props
  const { propertyID, roomID } = props.match.params

  useEffect(() => {
    get(currentUserID, propertyID, roomID, { eager: 'Tenants' })
  }, [get, currentUserID, propertyID, roomID])

  return (
    <PageContent>
      <Box mb={2}>
        <Button 
          variant='contained'
          component={Link}
          color='primary'
          to={{ pathname: `/properties/${propertyID}/rooms/${roomID}/edit` }}>
          Edit room
        </Button>
      </Box>
      {
        !loading &&
        room &&
        <FormStyledComponent>
          <Form
            initialValues={room}
            loading={loading}
            error={error}
            title='Room'
            readonly={true} />
        </FormStyledComponent>
      }
    </PageContent>
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
