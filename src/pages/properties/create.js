import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styled from 'styled-components'

import Form from './../../components/properties/form'
import { FormStyledComponent } from './../../styledComponents/form'
import { create } from './../../api/properties'

const Style = styled.div`
  width: 500px;
  margin: auto;

.blockBody{
  padding: 12px 24px;
}

.formFieldWrapper input{
  width: 100%;
}

.formFieldWrapper select{
  width: 100%;
}

`

function PropertyCreatePage(props) {
  const { loading, error, property, create, currentUserID } = props
  const [submitted, setSubmitted] = useState(false)

  const createSubmit = (values) => {
    setSubmitted(true)
    create(currentUserID, values)
  }

  useEffect(() => {
    if (!loading && !error && submitted && property) {
      props.history.push(`/properties/${property.id}`)
    }
  }, [props.history, loading, error, submitted, property])

  return (
    <Style>
      <div className='propertyCreatePage'>
        <FormStyledComponent>
          <Form
            onSubmit={createSubmit}
            loading={loading}
            submitError={error}
            title='Create property'
            buttonText='Create property' />
        </FormStyledComponent>
      </div>
    </Style>
  )
}

const mapStateToProps = state => ({
  loading: state.property.getIn(['createLoading']),
  error: state.property.getIn(['createError']),
  property: state.property.getIn(['property']),
  currentUserID: state.auth.getIn(['currentUserID']),
})
const mapDispatchToProps = dispatch => bindActionCreators({
  create
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(PropertyCreatePage)
