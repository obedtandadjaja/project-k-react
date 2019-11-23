import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Form from './../../components/properties/form'
import { edit, get } from './../../api/properties'

function PropertyEditPage(props) {
  const { loading, error, property, edit, get } = props
  const [submitted, setSubmitted] = useState(false)
  const editSubmit = (values) => {
    setSubmitted(true)
    edit(values)
  }

  useEffect(() => { get(props.match.params.propertyID) }, [get, props.match.params.propertyID])

  useEffect(() => {
    if (!loading || !error) {
      submitted &&
        props.history.push(`/users/${props.match.params.userID}`)
    }
  })

  return (
    <div className='propertyEditPage'>
      {
        property &&
        <Form
          initialValues={property}
          onSubmit={editSubmit}
          loading={loading}
          submitError={error} />
      }
    </div>
  )
}

const mapStateToProps = state => ({
  loading: state.property.getIn(['editLoading']),
  error: state.property.getIn(['editError']),
  property: state.property.getIn(['property']),
})
const mapDispatchToProps = dispatch => bindActionCreators({
  edit,
  get,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(PropertyEditPage)
