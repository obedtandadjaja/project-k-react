import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Form from './../../components/properties/form'
import { create } from './../../api/properties'

function PropertyCreatePage(props) {
  const { loading, error, property, create } = props

  const createSubmit = (values) => {
    create(values)
  }

  useEffect(() => {
    if (!loading || !error) {
      property &&
        props.history.push(`/properties/${property.id}`)
    }
  }, [props.history, loading, error, property])

  return (
      <div className='propertyCreatePage'>
      <Form onSubmit={createSubmit} submitting={loading} error={error} />
      </div>
  )
}

const mapStateToProps = state => ({
  loading: state.property.getIn(['createLoading']),
  error: state.property.getIn(['createError']),
  property: state.property.getIn(['property']),
})
const mapDispatchToProps = dispatch => bindActionCreators({
  create
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(PropertyCreatePage)
