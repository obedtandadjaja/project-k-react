import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Form from './../../components/properties/form'

function PropertyEditPage(props) {
  const editSubmit = (values) => {
    console.log(values)
  }

  return (
    <div className='propertyEditPage'>
      <Form onSubmit={editSubmit} />
    </div>
  )
}

const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(PropertyEditPage)
