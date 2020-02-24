import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import Button from '@material-ui/core/Button'
import FilterListIcon from '@material-ui/icons/FilterList'

import { all as allProperties } from './../../../api/properties'
import { all as allMaintenanceRequests } from './../../../api/maintenanceRequests'
import Form from './filterForm'
import FormStyledComponent from './../../../styledComponents/form'

// this is a quick fix, since haven't find a way to directly change the 
// component css by using styled-component
const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
}))

function MaintenanceRequestFilterModal(props) {
  const { 
    status, 
    allProperties, 
    allMaintenanceRequests, 
    currentUserID, 
    allLoading, 
    properties 
  } = props
  
  const [open, setOpen] = useState(false)

  const classes = useStyles()

  useEffect(() => {
    allProperties(currentUserID, { eager: 'Rooms' })
  }, [allProperties, currentUserID])

  const openModal = () => {
    setOpen(true)
  }

  const closeModal = () => {
    setOpen(false)
  }

  const filterSubmit = (values) => {
    let queryParams = {
      eager: 'Property, Room, Reporter',
      status: status
    }

    if(values.dateOpened && values.dateOpened.check) {
      if(values.dateOpened.params === 'before') {
        queryParams.opened_end_date = values.dateOpened.createdAt 
      } else {
        queryParams.opened_start_date = values.dateOpened.createdAt 
      }
    }

    if(values.property && values.property.check) {
      queryParams.property_id = values.property.id
    }

    if(values.room && values.room.check) {
      queryParams.room_id = values.room.id
    }

    if(values.category && values.category.check) {
      queryParams.category = values.category.name
    }
    
    closeModal()
    allMaintenanceRequests(currentUserID, queryParams)
  }

  return(
    <div className='maintenanceRequestsFilterModal'>
      <Button 
        variant='contained' 
        color='secondary' 
        onClick={openModal}
        startIcon={<FilterListIcon />} >
        Filter
      </Button>
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
                onSubmit={filterSubmit}
                loading={allLoading}
                closeModal={closeModal} />
            </FormStyledComponent>
          }
        </Fade>
      </Modal>
    </div>
  )
}

const mapStateToProps = state => ({
  currentUserID: state.auth.getIn(['currentUserID']),
  properties: state.property.getIn(['properties']),
  allLoading: state.maintenance_request.getIn(['allLoading']),
})
const mapDispatchToProps = dispatch => bindActionCreators({
  allProperties,
  allMaintenanceRequests,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MaintenanceRequestFilterModal)
