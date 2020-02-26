import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import Button from '@material-ui/core/Button'
import styled from 'styled-components'

import renderDateField from './../../../formHelpers/renderDateField'
import renderSelectField from './../../../formHelpers/renderSelectField'
import renderCheckboxField from './../../../formHelpers/renderCheckboxField'
import renderSelectCheckField from './../../../formHelpers/renderSelectCheckField'
import { DEVICE_SIZE, MAINTENANCE_REQUEST_CATEGORY_MAP } from './../../../constants'

const Style = styled.div`
  .rowInput {
    display: flex;
    margin-bottom: 2em;
  }

  .rowInput > * {
    margin: 0.3em;
  }

  ${'' /* .checkBox {
    width: 20px;
    height: 40px;
  }


  .formFieldWrapper select {
    width: 200px;
  }

  .mr-auto {
    margin-right: auto;
  }

  #dateRowInput .formFieldWrapper input {
    border: none;
    border-radius: none;
  }

  #dateRowInput #date-picker {
    width: 200px;
  } */}

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
                component={renderCheckboxField} />
            </div>
            
            <Field
              name='property'
              label='Property:'
              component={renderSelectCheckField}
              defaultEmpty
              optionsParams={[
                ['only', 'Only']
              ]}
              optionsValue={properties.map(property => 
                [property.id, property.name]
              )} />

            <Field
              name='room'
              label='Room:'
              component={renderSelectCheckField}
              defaultEmpty
              optionsParams={[
                ['only', 'Only']
              ]}
              optionsValue={roomList.map(room =>
                [room.id, room.name]
              )} />

            <Field
              name='category'
              label='Category:'
              component={renderSelectCheckField}
              defaultEmpty
              optionsParams={[
                ['only', 'Only']
              ]}
              optionsValue={Array.from(MAINTENANCE_REQUEST_CATEGORY_MAP, ([key, value]) => { return ([key, value.name]) }
              )} />
            
            <div className='btnContainer'>
              <Button className='mr-auto' variant='contained' color='primary' type='submit' disabled={loading}>
                Filter
              </Button>
              <Button variant='contained' color='secondary' onClick={closeModal}>
                Close
              </Button>
            </div>
          </div>
        </div>
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
  const selectedPropertyValue = selector(state, 'property.value')
  return {
    selectedPropertyValue,
    properties: state.property.getIn(['properties'])
  }
}

export default connect(mapStateToProps)(filterForm)
