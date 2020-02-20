import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import styled from 'styled-components'

import renderDateField from './../../formHelpers/renderDateField'
import renderSelectField from './../../formHelpers/renderSelectField'
import { DEVICE_SIZE, MAINTENANCE_REQUEST_CATEGORY_MAP } from './../../constants'

const Style = styled.div`
  .rowInput {
    display: flex;
  }

  .rowInput > * {
    margin: 0.3em;
  }

  .checkBox {
    width: 20px;
    height: 40px;
  }

  .formFieldWrapper:first-child select {
    width: 90px;
  }

  .formFieldWrapper select {
    width: 200px;
  }

  #dateRowInput .formFieldWrapper input {
    border: none;
    border-radius: none;
  }

  #dateRowInput #date-picker {
    width: 200px;
  }

  @media ${DEVICE_SIZE.mobileL} {
    .formFieldWrapper select{
      width: 100%;
    }

    .formFieldWrapper:first-child select {
      width: 100%;
    }

    .formFieldWrapper input {
      width: 100%;
    }
  }
`

function MaintenanceRequestFilterForm(props) {
  const { 
    properties,
    selectedPropertyValue, 
    handleSubmit, 
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
  }, [selectedPropertyValue])

  return(
    <Style>
      <form onSubmit={handleSubmit}>
        <div className='blockCard'>
          <div className='blockHeader'>
            Filter Results
          </div>
          <div className='blockBody'>

            <label>Date Opened:</label>
            <div className='rowInput' id='dateRowInput'>
              <Field
                name='dateOpened.params'
                component={renderSelectField}
                defaultEmpty
                options={[
                  ['after', 'After'],
                  ['before', 'Before']
                ]} />
              <Field
                name='dateOpened.createdAt'
                component={renderDateField} />
              <Field
                name='dateOpened.check'
                component='input'
                type='checkbox'
                className='checkBox' />
            </div>
            
            <label>Property:</label>
            <div className='rowInput'>                
              <Field
                name='property.params'
                component={renderSelectField}
                className='selectValue'
                readonly={true}
                options={[
                  ['only', 'Only']
                ]} />
              <Field
                name='property.id'
                component={renderSelectField}
                options={properties.map(property =>
                  [property.id, property.name]
                )}
                defaultEmpty />
              <Field
                name='property.check'
                component='input'
                type='checkbox'
                className='checkBox' />
            </div>
            
            <label>Room:</label>
            <div className='rowInput'>
              <Field
                name='room.params'
                component={renderSelectField}
                readonly={true}
                options={[
                  ['only', 'Only']
                ]} />
              <Field
                name='room.id'
                component={renderSelectField}
                defaultEmpty
                options={roomList.map(room =>
                  [room.id, room.name]
                )} />
              <Field
                name='room.check'
                component='input'
                type='checkbox'
                className='checkBox' />
            </div>
            
            <label>Category:</label>
            <div className='rowInput'>                
              <Field
                name='category.params'
                component={renderSelectField}
                readonly={true}
                options={[
                  ['only', 'Only']
                ]} />
              <Field
                name='category.name'
                component={renderSelectField}
                defaultEmpty
                options={Array.from(MAINTENANCE_REQUEST_CATEGORY_MAP, ([key, value]) => 
                  { return ([key, value.name]) }
                )} />
              <Field
                name='category.check'
                component='input'
                type='checkbox'
                className='checkBox' />
            </div>

          </div>
        </div>
        <button className='btn' type='submit' disabled={loading}>
          Filter
        </button>
      </form>
    </Style>
  )
}

let filterForm = reduxForm({
  form: 'maintenanceRequestFilter',
  enabledReinitialize: true,
})(MaintenanceRequestFilterForm)

const mapStateToProps = state => {
  const selector = formValueSelector('maintenanceRequestFilter')
  const selectedPropertyValue = selector(state, 'property.id')
  return {
    selectedPropertyValue,
    properties: state.property.getIn(['properties'])
  }
}

export default connect(mapStateToProps)(filterForm)
