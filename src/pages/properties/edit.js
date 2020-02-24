import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Form from './../../components/properties/form'
import FormStyledComponent from './../../styledComponents/form'
import PageContent from './../../styledComponents/pageContent'
import { edit, get } from './../../api/properties'

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
    <PageContent>
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
    </PageContent>
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
