import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { Grid, Button } from '@material-ui/core'

import renderSelectDateCheckField from './../../../formHelpers/renderSelectDateCheckField'
import renderSelectCheckField from './../../../formHelpers/renderSelectCheckField'
import { MAINTENANCE_REQUEST_CATEGORY_MAP } from './../../../constants'

function MaintenanceRequestFilterForm(props) {
  const { 
    properties,
    selectedPropertyValue, 
    handleSubmit, 
    closeModal, 
    loading 
  } = props

  const [roomList, setRoomList] = useState([])

  useEffect(() => {
    if (selectedPropertyValue && properties) {
      const property = properties.find(property => property.id === selectedPropertyValue)
      setRoomList(property.rooms)
    } else {
      setRoomList([])
    }
  }, [selectedPropertyValue, properties])

  return(
    <form onSubmit={handleSubmit}>
      <div className='blockCard'>
        <div className='blockHeader'>
          Filter Results
        </div>
        <div className='blockBody'>

          <Field
            name='date'
            label='Date:'
            component={renderSelectDateCheckField}
            options={[
              ['after', 'After'],
              ['before', 'Before']
            ]} />

          <Field
            name='property'
            label='Property:'
            component={renderSelectCheckField}
            options={properties.map(property =>
              [property.id, property.name]
            )} />

          <Field
            name='room'
            label='Room:'
            component={renderSelectCheckField}
            defaultEmpty
            options={roomList.map(room =>
              [room.id, room.name]
            )} />

          <Field
            name='category'
            label='Category:'
            component={renderSelectCheckField}
            defaultEmpty
            options={Array.from(MAINTENANCE_REQUEST_CATEGORY_MAP, ([key, value]) => { return ([key, value.name]) }
            )} />
          
          <Grid container justify='center' alignItems='center' spacing={4}>
            <Grid item>
              <Button className='mr-auto' variant='contained' color='primary' type='submit' disabled={loading}>
                Filter
              </Button>
            </Grid>
            <Grid item>
              <Button variant='contained' color='secondary' onClick={closeModal}>
                Close
              </Button>
            </Grid>
          </Grid>
        </div>
      </div>
    </form>
  )
}

let filterForm = reduxForm({
  form: 'maintenanceRequestFilter',
  enabledReinitialize: true,
})(MaintenanceRequestFilterForm)

const mapStateToProps = state => {
  const selector = formValueSelector('maintenanceRequestFilter')
  const selectedPropertyValue = selector(state, 'property.value')
  return {
    selectedPropertyValue,
    properties: state.property.getIn(['properties'])
  }
}

export default connect(mapStateToProps)(filterForm)
