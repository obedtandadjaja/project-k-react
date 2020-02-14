import React, { useEffect, useState } from 'react'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styled from 'styled-components'

import { required } from './../../formHelpers/validators'
import renderField from './../../formHelpers/renderField'
import renderSelectField from './../../formHelpers/renderSelectField'
import { all } from './../../api/properties'
import { MAINTENANCE_REQUEST_CATEGORY_MAP } from './../../constants'

const Style = styled.div`
  .row{
    display:block;
  }
`

function MaintenanceForm(props) {
  const { 
    all, 
    currentUserID, 
    hasPropertyValue, 
    handleSubmit, 
    readonly, 
    submitError, 
    loading, 
    title, 
    buttonText, 
    properties, 
    initialValues, 
  } = props

  const [rooms, setRooms] = useState()

  useEffect(() => {
    if(hasPropertyValue) {
      const property = properties.filter(property => property.id.includes(hasPropertyValue))
      const arrRoom = []

      property.map((data) => {
        return arrRoom.push(data.rooms)
      })

      setRooms(arrRoom[0])
    }

    if(initialValues !== null){
      all(currentUserID, { eager: 'Rooms' })
    }

  }, [all, currentUserID, hasPropertyValue, initialValues, properties])
  
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
                  properties &&
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
                }
                {
                  hasPropertyValue && rooms &&
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
                }
                <Field
                  name='category'
                  label='Category'
                  component={renderSelectField}
                  validate={[required]}
                  readonly={readonly}
                  defaultEmpty
                  options={Array.from(MAINTENANCE_REQUEST_CATEGORY_MAP, ([key, value]) =>
                  { return ([key, value.name]) }
                  )}
                />

                <Field
                  name='title'
                  label='Title'
                  component={renderField}
                  validate={[required]}
                  readonly={readonly}
                  type='text'
                  defaultEmpty />

                <Field
                  name='description'
                  label='Description'
                  component={renderField}
                  validate={[required]}
                  readonly={readonly}
                  type='text'
                  defaultEmpty />

                <div className='errorResponse'>
                  {submitError && JSON.stringify(submitError)}
                </div>
              </div>
            </div>
          </div>
        </div>
        {
          !readonly &&
          <button className='btn' type='submit' disabled={loading}>
            {buttonText}
          </button>
        }
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
  const hasPropertyValue = selector(state, 'propertyID')
  return{
    hasPropertyValue,
    currentUserID: state.auth.getIn(['currentUserID']),
  }
}
const mapDispatchToProps = dispatch => bindActionCreators({
  all,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(maintenanceForm)
