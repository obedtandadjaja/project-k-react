import React, { useEffect, useState } from 'react'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Button from '@material-ui/core/Button'
import styled from 'styled-components'
import moment from 'moment'

import { required } from './../../formHelpers/validators'
import renderField from './../../formHelpers/renderField'
import renderSelectField from './../../formHelpers/renderSelectField'
import { all } from './../../api/properties'
import { MAINTENANCE_REQUEST_CATEGORY_MAP } from './../../constants'

const Style = styled.div`
  .row {
    display: block;
  }
`

function MaintenanceForm(props) {
  const { 
    all, 
    currentUserID, 
    selectedPropertyValue, 
    handleSubmit, 
    onCancel, 
    readonly, 
    submitError, 
    loading, 
    title, 
    buttonText, 
    properties, 
    initialValues, 
  } = props

  const [rooms, setRooms] = useState([])

  useEffect(() => {
    if (selectedPropertyValue) {
      const property = properties.find(property => property.id === selectedPropertyValue)
      setRooms(property.rooms)
    }

    if (initialValues === null) { all(currentUserID, { eager: 'Rooms' }) }
  }, [all, currentUserID, selectedPropertyValue, initialValues])
  
  return (
    <Style>
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
                    <Button variant='contained' color='primary' type='submit' disabled={loading}>
                      {buttonText}
                    </Button>
                  }
                  <Button variant='outlined' color='secondary' onClick={onCancel}>CLOSE</Button>
                </div>
  
                <div className='errorResponse'>
                  {submitError && JSON.stringify(submitError)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Style>
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
  }
}
const mapDispatchToProps = dispatch => bindActionCreators({
  all,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(maintenanceForm)
