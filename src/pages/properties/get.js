import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'

import Form from './../../components/properties/form'
import { get } from './../../api/properties'

function PropertyGetPage(props) {
  const { loading, error, property, get, currentUserID } = props
  const { propertyID } = props.match.params

  useEffect(() => {
    get(currentUserID, propertyID, { eager: true })
  }, [get, propertyID, currentUserID])

  return (
    <div className='propertyGetPage'>
      <Link to={{ pathname: `/properties/${propertyID}/edit` }}>
        <button>
          Edit property
        </button>
      </Link>

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
