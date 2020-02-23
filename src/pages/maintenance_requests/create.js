import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'

import Form from './../../components/maintenance_requests/form'
import { FormStyledComponent } from './../../styledComponents/form'
import { create } from './../../api/maintenanceRequests'
import { all } from './../../api/properties'

// this is a quick fix, since can't directly change the 
// component css by using styled-component
const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
}))

function MaintenanceRequestsCreateModal(props) {
  const classes = useStyles()
  const { loading, error, currentUserID, properties, all, create } = props
  const [open, setOpen] = useState(false)

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
    <div className='maintenanceRequestCreateModal'>
      <button className='btn btn-primary' onClick={openModal}>
        Add Ticket
      </button>
      <Modal
        className={classes.modal}
        open={open}
        onClose={closeModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }} >
        <Fade in={open}>
          {
            properties &&
            <FormStyledComponent>
              <Form
                properties={properties}
                onSubmit={createSubmit}
                closeModal={closeModal}
                loading={loading}
                submitError={error}
                title='Create Maintenance Request'
                buttonText='Create' />
            </FormStyledComponent>
          }
        </Fade>
      </Modal>
    </div>
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
