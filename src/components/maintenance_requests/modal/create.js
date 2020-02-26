import React, { useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Modal, Backdrop, Fade, Button } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'

import Form from './../form'
import FormStyledComponent from './../../../styledComponents/form'
import { create } from './../../../api/maintenanceRequests'

function MaintenanceRequestsCreateModal(props) {
  const { loading, error, currentUserID, create } = props
  const [isOpen, setOpen] = useState(false)

  const openModal = () => {
    setOpen(true)
  }

  const closeModal = () => {
    setOpen(false)
  }

  const createSubmit = (values) => {
    closeModal()
    create(currentUserID, values)
  }

  return (
    <>
      <Button 
        variant='contained' 
        color='primary' 
        onClick={openModal}
        startIcon={<AddIcon />} >
        Add Ticket
      </Button>
      <Modal
        open={isOpen}
        onClose={closeModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }} 
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }} >
        <Fade in={isOpen}>
          <FormStyledComponent>
            <Form
              onSubmit={createSubmit}
              onCancel={closeModal}
              loading={loading}
              submitError={error}
              title='Create Maintenance Request'
              buttonText='Create' />
          </FormStyledComponent>
        </Fade>
      </Modal>
    </>
  )
}

const mapStateToProps = state => ({
  loading: state.maintenance_request.getIn(['createLoading']),
  error: state.maintenance_request.getIn(['createError']),
  currentUserID: state.auth.getIn(['currentUserID']),
})
const mapDispatchToProps = dispatch => bindActionCreators({
  create,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MaintenanceRequestsCreateModal)
