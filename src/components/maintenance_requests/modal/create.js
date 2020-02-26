import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Modal, Backdrop, Fade, Button } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'

import Form from './../form'
import FormStyledComponent from './../../../styledComponents/form'
import { create } from './../../../api/maintenanceRequests'
import { all } from './../../../api/properties'

function MaintenanceRequestsCreateModal(props) {
  const { loading, error, currentUserID, properties, all, create } = props
  const [isOpen, setOpen] = useState(false)

  useEffect(() => {
    all(currentUserID, { eager: 'Rooms' })
  }, [currentUserID, all])

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
          {
            properties &&
            <FormStyledComponent>
              <Form
                properties={properties}
                onSubmit={createSubmit}
                onCancel={closeModal}
                loading={loading}
                submitError={error}
                title='Create Maintenance Request'
                buttonText='Create' />
            </FormStyledComponent>
          }
        </Fade>
      </Modal>
    </>
  )
}

const mapStateToProps = state => ({
  loading: state.maintenance_request.getIn(['createLoading']),
  error: state.maintenance_request.getIn(['createError']),
  currentUserID: state.auth.getIn(['currentUserID']),
  properties: state.property.getIn(['properties']),
})
const mapDispatchToProps = dispatch => bindActionCreators({
  all,
  create,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MaintenanceRequestsCreateModal)
