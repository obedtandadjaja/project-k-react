import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styled from 'styled-components'

import Form from './../../components/properties/form'
import { FormStyledComponent } from './../../styledComponents/form'
import { edit, get } from './../../api/properties'

const Style = styled.div`
  width: 500px;
  margin: auto;

  form .blockCard:first-child {
    margin-top: 10%;
  }
`

function PropertyEditPage(props) {
  const { getLoading, loading, error, property, edit, get, currentUserID } = props
  const { propertyID } = props.match.params
  const [submitted, setSubmitted] = useState(false)

  const editSubmit = (values) => {
    setSubmitted(true)
    edit(currentUserID, values)
  }

  useEffect(() => {
    get(currentUserID, propertyID)
  }, [get, currentUserID, propertyID])

  useEffect(() => {
    if (!loading && !error) {
      submitted &&
        props.history.push(`/properties/${props.match.params.propertyID}`)
    }
  })

  return (
    <Style>
      <div className='propertyEditPage'>
        {
          !getLoading &&
          property &&
          <FormStyledComponent>
            <Form
              initialValues={property}
              onSubmit={editSubmit}
              loading={loading}
              submitError={error}
              title='Edit property'
              buttonText='Edit property' />
          </FormStyledComponent>
        }
      </div>
    </Style>
  )
}

const mapStateToProps = state => ({
  loading: state.property.getIn(['editLoading']),
  getLoading: state.property.getIn(['getLoading']),
  error: state.property.getIn(['editError']),
  property: state.property.getIn(['property']),
  currentUserID: state.auth.getIn(['currentUserID']),
})
const mapDispatchToProps = dispatch => bindActionCreators({
  edit,
  get,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(PropertyEditPage)
