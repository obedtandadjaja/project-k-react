import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Form from './../../components/properties/form'
import { get } from './../../api/properties'

function PropertyGetPage(props) {
  const { loading, error, property, get } = props

  useEffect(() => {
    get(props.match.params.propertyID)
  }, [get, props.match.params.propertyID])

  return (
    <div className='propertyGetPage'>
      <Form initialValues={property} loading={loading} error={error} readonly />
    </div>
  )
}

const mapStateToProps = state => ({
  loading: state.property.getIn(['getLoading']),
  error: state.property.getIn(['getError']),
  property: state.property.getIn(['property']),
})
const mapDispatchToProps = dispatch => bindActionCreators({
  get
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(PropertyGetPage)
