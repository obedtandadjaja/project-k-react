import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Form from './../../components/properties/form'
import FormStyledComponent from './../../styledComponents/form'
import PageContent from './../../styledComponents/pageContent'
import { create } from './../../api/properties'

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
    <PageContent>
      <FormStyledComponent>
        <Form
          onSubmit={createSubmit}
          loading={loading}
          submitError={error}
          title='Create property'
          buttonText='Create property' />
      </FormStyledComponent>
    </PageContent>
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
