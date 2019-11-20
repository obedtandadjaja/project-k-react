import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Form from './../../components/users/form'

function UserEditPage(props) {
  const editSubmit = (values) => {
    console.log(values)
  }

  return (
    <div className='userEditPage'>
      <Form onSubmit={editSubmit} />
    </div>
  )
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(UserEditPage)
