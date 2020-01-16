import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'

import Form from './../../components/properties/form'
import { get } from './../../api/properties'

import { FormStyle } from './../../style/styleHelpers'

function PropertyGetPage(props) {
  const { loading, error, property, get, currentUserID } = props
  const { propertyID } = props.match.params

  useEffect(() => {
    get(currentUserID, propertyID, { eager: true })
  }, [get, propertyID, currentUserID])


  // custom inline styling... need to make this neat
  const style = {
    display: 'flex',
    flexDirection: 'column',
  }

  const align = {
    color: 'blue',
    float: 'right',

  }

  const blue = {
    color: '#18A0FB',
  }

  return (
    <div className='propertyGetPage' style={style}>
      <div style={align}>
        <Link to={{ pathname: `/properties/${propertyID}/edit` }} >
          <button style={blue}>
            Edit property
          </button>
        </Link>
      </div>
        {
          !loading &&
          property &&
          <FormStyle>
            <Form
              initialValues={property}
              loading={loading}
              error={error}
              title='Property'
              readonly 
              />
          </FormStyle>
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
