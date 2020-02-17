import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import Select from '@material-ui/core/Select';
import styled from 'styled-components'

import { all } from './../../api/properties'
import { FormStyledComponent } from './../../styledComponents/form'
import renderField from './../../formHelpers/renderField'
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

  .formFieldWrapper select {
    width: 90px;
  }

  @media ${DEVICE_SIZE.mobileL} {
    .formFieldWrapper select{
      width: 100%;
    }

    .formFieldWrapper input {
      width: 100%;
    }
  }
`

function MaintenanceRequestFilterPage(props) {
  const { all, currentUserID, properties, selectedPropertyValue } = props

  const [rooms, setRooms] = useState([])

  useEffect(() => {
    all(currentUserID, { eager: 'Rooms' })

    if (selectedPropertyValue) {
      const property = properties.find(property => property.id === selectedPropertyValue)
      setRooms(property.rooms)
    }
  }, [all, currentUserID, selectedPropertyValue])

  return(
    <FormStyledComponent>
      <Style>
        <form>
          <div className='blockCard'>
            <div className='blockHeader'>
              Filter Results
          </div>
            <div className='blockBody'>

              <label>Date Opened:</label>
              <div className='rowInput'>
                <Field
                  name='date.params'
                  component={renderSelectField}
                  defaultEmpty
                  options={[
                    ['after', 'After'],
                    ['before', 'Before']
                  ]} />
                <Field
                  name='date.value'
                  label='YYYY-MM-DD'
                  component={renderField}
                  defaultEmpty />
                <Field
                  name='date.check'
                  label='YYYY-MM-DD'
                  component='input'
                  type='checkbox'
                  className='checkBox'
                  defaultEmpty />
              </div>
              
              <label>Property:</label>
              <div className='rowInput'>                
                <Field
                  name='property.params'
                  component={renderSelectField}
                  className='selectValue'
                  defaultEmpty
                  options={[
                    ['only', 'Only']
                  ]} />
                <Field
                  name='property.value'
                  component={renderSelectField}
                  options={properties.map(property =>
                    [property.id, property.name]
                  )}
                  defaultEmpty />
                <Field
                  name='property.check'
                  label='YYYY-MM-DD'
                  component='input'
                  type='checkbox'
                  className='checkBox'
                  defaultEmpty />
              </div>
              
              <label>Room:</label>
              <div className='rowInput'>
                <Field
                  name='room.params'
                  component={renderSelectField}
                  defaultEmpty
                  options={[
                    ['only', 'Only']
                  ]} />
                <Field
                  name='room.value'
                  component={renderSelectField}
                  defaultEmpty
                  options={rooms.map(room =>
                    [room.id, room.name]
                  )} />
                <Field
                  name='room.check'
                  label='YYYY-MM-DD'
                  component='input'
                  type='checkbox'
                  className='checkBox'
                  defaultEmpty />
              </div>
              
              <label>Category:</label>
              <div className='rowInput'>                
                <Field
                  name='category.params'
                  component={renderSelectField}
                  defaultEmpty
                  options={[
                    ['only', 'Only']
                  ]} />
                <Field
                  name='category.value'
                  component={renderSelectField}
                  defaultEmpty
                  options={Array.from(MAINTENANCE_REQUEST_CATEGORY_MAP, ([key, value]) => 
                    { return ([key, value.name]) }
                  )} />
                <Field
                  name='category.check'
                  label='YYYY-MM-DD'
                  component='input'
                  type='checkbox'
                  className='checkBox'
                  defaultEmpty />
              </div>
            </div>
          </div>
          <button className='btn' type='submit'>
            Filter
          </button>
        </form>
      </Style>
    </FormStyledComponent>
  )
}

let maintenanceRequestFilterForm = reduxForm({
  form: 'maintenanceRequestFilter',
  enabledReinitialize: true,
})(MaintenanceRequestFilterPage)

const mapStateToProps = state => {
  const selector = formValueSelector('maintenanceRequestFilter')
  const selectedPropertyValue = selector(state, 'property.value')
  return {
    selectedPropertyValue,
    currentUserID: state.auth.getIn(['currentUserID']),
    properties: state.property.getIn(['properties'])
  }
}
const mapDispatchToProps = dispatch => bindActionCreators({
  all
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(maintenanceRequestFilterForm)