import React, {useEffect, useState} from 'react'
import { Field, reduxForm, formValueSelector  } from 'redux-form'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { required } from '../../formHelpers/validators'
import renderField from '../../formHelpers/renderField'
import renderSelectField from '../../formHelpers/renderSelectField'


import { all as fetchRooms } from './../../api/rooms'
import { all as fetchProperties } from './../../api/properties'

import styled from 'styled-components'

const Style = styled.div`
  .row{
    display:block;
  }
`

function MaintenanceForm(props) {

  const { 
    currentUserID, 
    fetchRooms, 
    hasPropertyValue, 
    handleSubmit, 
    readonly, 
    edit,
    submitError, 
    loading, 
    title, 
    buttonText,
    properties,
    initialValues} = props

  const [ rooms, setRooms ] = useState( null )

  useEffect(() => {
    if(hasPropertyValue != null) {
      fetchAllRoomsFromProperty()
    }
    if(initialValues != null){
      fetchProperties(currentUserID, {})
    }

  }, [ currentUserID, hasPropertyValue ])

  async function fetchAllRoomsFromProperty() {
    const dispatch = await fetchRooms(currentUserID, hasPropertyValue, { eager: 'Tenants' })
    setRooms(dispatch.payload)
  }
  
  return (
    <Style>
      <form onSubmit={handleSubmit}>
        { /** maintenance request card */}
        <div className='row'>
          <div className='col'>
            <div className="blockCard">
              <div className="blockHeader">
                {title}
              </div>
              <div className="blockBody">
                { 
                  properties &&
                  <Field
                  name='propertyID'
                  label='Property'
                  component={renderSelectField}
                  validate={[required]}
                  readonly={edit}
                  defaultEmpty
                  options={properties.map(property => {
                    return(
                      [property.id, property.name]
                    )
                  })} />
                  
                }
                {
                  hasPropertyValue && rooms &&
                  <Field
                    name='roomID'
                    label='Room'
                    component={renderSelectField}
                    validate={[required]}
                    readonly={edit}
                    defaultEmpty
                    options={rooms.map(room => {
                      return (
                        [room.id, room.name]
                      )
                    })} />
                }

                <Field
                  name='title'
                  label='Title'
                  component={renderField}
                  validate={[required]}
                  readonly={readonly}
                  type='text'
                  defaultEmpty
                />

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


        { /** button card */}
        {
          !readonly &&
          <button className='button' type='submit' disabled={loading}>
            {buttonText}
          </button>
        }
      </form>
    </Style>
  )
}

let maintenanceForm = reduxForm({
  form: 'maintenance',
  enabledReinitialize: true,
})(MaintenanceForm)

const mapStateToProps = state => {
  const selector = formValueSelector('maintenance')
  const hasPropertyValue = selector(state, 'propertyID')
  return{
    hasPropertyValue,
    currentUserID: state.auth.getIn(['currentUserID']),
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchRooms,
  fetchProperties,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(maintenanceForm)
