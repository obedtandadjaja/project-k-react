import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Modal, Backdrop, Fade, Button } from '@material-ui/core'
import FilterListIcon from '@material-ui/icons/FilterList'

import Form from './filterForm'
import FormStyledComponent from './../../../styledComponents/form'
import { all as allProperties } from './../../../api/properties'
import { allOpen, allClosed } from './../../../api/maintenanceRequests'

function MaintenanceRequestFilterModal(props) {
  const { 
    status, 
    allProperties, 
    allOpen, 
    allClosed,
    currentUserID, 
    allLoading, 
    properties 
  } = props
  
  const [isOpen, setOpen] = useState(false)

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
        queryParams.opened_end_date = values.dateOpened.value 
      } else {
        queryParams.opened_start_date = values.dateOpened.value 
      }
    }

    if(values.property && values.property.check) {
      queryParams.property_id = values.property.value
    }

    if(values.room && values.room.check) {
      queryParams.room_id = values.room.value
    }

    if(values.category && values.category.check) {
      queryParams.category = values.category.value
    }
    
    closeModal()

    if(status === 'pending') {
      allOpen(currentUserID, queryParams)
    } else {
      allClosed(currentUserID, queryParams)
    }  
  }

  return(
    <>
      <Button 
        variant='contained' 
        color='secondary' 
        onClick={openModal}
        startIcon={<FilterListIcon />} >
        Filter
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
          justifyContent:'center',
        }} >
        <Fade in={isOpen}>
          <FormStyledComponent>
            <Form
              properties={properties}
              onSubmit={filterSubmit}
              loading={allLoading}
              closeModal={closeModal} />
          </FormStyledComponent>
        </Fade>
      </Modal>
    </>
  )
}

const mapStateToProps = state => ({
  currentUserID: state.auth.getIn(['currentUserID']),
  properties: state.property.getIn(['properties']),
  allLoading: state.maintenance_request.getIn(['allLoading']),
})
const mapDispatchToProps = dispatch => bindActionCreators({
  allProperties,
  allOpen,
  allClosed,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MaintenanceRequestFilterModal)
