import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button } from '@material-ui/core/'
import moment from 'moment'

import { required } from './../../formHelpers/validators'
import renderField from './../../formHelpers/renderField'
import renderSelectField from './../../formHelpers/renderSelectField'
import { all } from './../../api/properties'
import { MAINTENANCE_REQUEST_CATEGORY_MAP } from './../../constants'


function MaintenanceForm(props) {
  const { 
    all, 
    allLoading,
    currentUserID, 
    properties,
    selectedPropertyValue, 
    handleSubmit, 
    onCancel, 
    readonly, 
    submitError, 
    loading, 
    title, 
    buttonText, 
  } = props

  const [rooms, setRooms] = useState([])
  const history = useHistory()

  useEffect(() => {
    all(currentUserID, { eager: 'Rooms' })
  }, [all, currentUserID])

  useEffect(() => {
    if (selectedPropertyValue && !allLoading) {
      const property = properties.find(property => property.id === selectedPropertyValue)
      setRooms(property.rooms)
    }
  }, [allLoading, selectedPropertyValue])

  const goBack = () => {
    history.goBack()
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <div className='row'>
        <div className='col'>
          <div className='blockCard'>
            <div className='blockHeader'>
              {title}
            </div>
            <div className='blockBody'>
              {
                readonly &&
                <Field      
                  name='createdAt'
                  label='Date Opened'
                  component={renderField}
                  readonly={readonly}
                  format={(value) => {
                    return moment(value).format('YYYY MMMM Do [, ] dddd')
                  }} />
              }

              <Field
                name='title'
                label='Title'
                component={renderField}
                validate={[required]}
                readonly={readonly}
                type='text'
                defaultEmpty />

              <Field
                name='propertyID'
                label='Property'
                component={renderSelectField}
                validate={[required]}
                readonly={readonly}
                defaultEmpty
                options={properties.map(property => 
                  [property.id, property.name]
                )} />

              <Field
                name='roomID'
                label='Room'
                component={renderSelectField}
                validate={[required]}
                readonly={readonly}
                defaultEmpty
                options={rooms.map(room => 
                  [room.id, room.name]
                )} />
              
              <Field
                name='category'
                label='Category'
                component={renderSelectField}
                validate={[required]}
                readonly={readonly}
                defaultEmpty
                options={Array.from(MAINTENANCE_REQUEST_CATEGORY_MAP, ([key, value]) =>
                  { return ([key, value.name]) }
                )} />

              <Field
                name='description'
                label='Description'
                component={renderField}
                validate={[required]}
                readonly={readonly}
                type='text'
                defaultEmpty />

              <div className='btnContainer'>
                {
                  !readonly &&
                  <Button 
                    variant='contained' 
                    color='primary' 
                    type='submit' 
                    disabled={loading} 
                    className='mr-auto' >
                    {buttonText}
                  </Button>
                }
                {
                  onCancel &&
                  <Button variant='contained' color='secondary' onClick={onCancel}>CLOSE</Button>
                }
                {
                  !onCancel &&
                  <Button variant='contained' color='secondary' onClick={goBack}>CLOSE</Button>
                }
              </div>

              <div className='errorResponse'>
                {submitError && JSON.stringify(submitError)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

let maintenanceForm = reduxForm({
  form: 'maintenanceRequest',
  enabledReinitialize: true,
})(MaintenanceForm)

const mapStateToProps = state => {
  const selector = formValueSelector('maintenanceRequest')
  const selectedPropertyValue = selector(state, 'propertyID')
  return{
    selectedPropertyValue,
    currentUserID: state.auth.getIn(['currentUserID']),
    properties: state.property.getIn(['properties']),
    allLoading: state.property.getIn(['allLoading'])
  }
}
const mapDispatchToProps = dispatch => bindActionCreators({
  all,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(maintenanceForm)
