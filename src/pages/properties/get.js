import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Form from './../../components/properties/form'
import { get } from './../../api/properties'

function PropertyGetPage(props) {
  const { loading, error, property, get, currentUserID } = props

  useEffect(() => {
    get(currentUserID, props.match.params.propertyID, { eager: true })
  }, [get, props.match.params.propertyID, currentUserID])

  return (
    <div className='propertyGetPage'>
      {
        !loading &&
        property &&
        <Form
          initialValues={property}
          loading={loading}
          error={error}
          title='Property'
          readonly />
      }
    </div>
  )
}

const mapStateToProps = state => ({
  loading: state.property.getIn(['getLoading']),
  error: state.property.getIn(['getError']),
  property: state.property.getIn(['property']),
  currentUserID: state.auth.getIn(['currentUserID']),
})
const mapDispatchToProps = dispatch => bindActionCreators({
  get
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(PropertyGetPage)
